const { Notice, Plugin, Platform, Modal, PluginSettingTab, Setting } = require('obsidian');
const COMMAND_NAME = 'Sync vault with Git';
const LFS_EXTENSIONS = 'jpg jpeg png gif webp heic tif tiff mp3 m4a wav flac ogg mp4 mov mkv webm pdf zip 7z rar';
const SETUP_IGNORES = ['.DS_Store', 'Thumbs.db', 'Desktop.ini', '.trash/', '.obsidian/workspace.json', '.obsidian/workspace-mobile.json', '.obsidian/workspaces.json', '.obsidian/cache/', '.obsidian/plugins/*/cache/', '.obsidian/plugins/*/.cache/'];

module.exports = class VaultGitSyncPlugin extends Plugin {
  syncing = false;
  feedback = 'Ready. Sync now saves, combines, and uploads. Manual actions let you do each step separately.';
  listeners = new Set();

  report(message) {
    this.feedback = message;
    for (const listener of this.listeners) listener();
  }

  supported() {
    return !Platform.isMobile && typeof process !== 'undefined'
      && ['darwin', 'win32', 'linux'].includes(process.platform);
  }

  onload() {
    if (!this.supported()) return;
    this.addRibbonIcon('git-merge', COMMAND_NAME, () => this.syncVault());
    this.addCommand({ id: 'sync-vault-with-git', name: COMMAND_NAME,
      callback: () => this.syncVault() });
    this.addSettingTab(new SyncSettingsTab(this.app, this));
    this.addCommand({ id: 'setup-vault-sync', name: 'Set up vault sync', callback: () => new SetupModal(this.app, this).open() });
    this.addCommand({ id: 'manual-git-tools', name: 'Open manual Git tools', callback: () => new SyncToolsModal(this.app, this).open() });
    for (const action of ACTIONS) this.addCommand({ id: `manual-${action.id}`, name: action.title, callback: () => this.runAction(action.id) });
    this.addCommand({ id: 'force-merge', name: 'Force merge: choose conflict preference', callback: () => new ForceMergeModal(this.app, this).open() });
  }

  async syncVault() { return this.runAction('sync'); }

  async runAction(action, options = {}) {
    if (!['sync', 'commit', 'pull', 'merge', 'push', 'status', 'finish', 'force', 'inspect', 'prepare', 'connect', 'upload'].includes(action)) return false;
    if (action === 'force' && !['ours', 'theirs'].includes(options.preference)) return false;
    if (!this.supported()) {
      new Notice('Git Sync Desktop requires desktop Obsidian on macOS, Windows, or Linux.', 10000);
      return false;
    }
    if (this.syncing) {
      new Notice('Vault sync is already running.');
      return false;
    }
    this.syncing = true;
    this.report('Checking vault…');
    const progress = new Notice('Checking vault…', 0);
    const { execFile } = require('node:child_process');
    const { promisify } = require('node:util');
    const fs = require('node:fs/promises');
    const path = require('node:path');
    const os = require('node:os');
    const runFile = promisify(execFile);
    // Keep the Mac path compatible with the existing watcher and shortcut.
    const state = process.platform === 'darwin'
      ? path.join(os.homedir(), 'Library', 'Application Support', 'ObsidianVaultSync')
      : path.join(process.platform === 'win32'
        ? (process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'))
        : (process.env.XDG_STATE_HOME || path.join(os.homedir(), '.local', 'state')), 'ObsidianVaultSync');
    const lock = path.join(state, 'sync.lock');
    let ownsLock = false;
    let phase = 'Checking vault';
    const status = (message) => { phase = message; progress.setMessage(`${message}…`); this.report(`${message}…`); };
    const done = (message) => { this.report(message); new Notice(message, 10000); return true; };
    try {
      const vaultPath = this.app.vault.adapter.getBasePath?.();
      if (!vaultPath) throw new Error('This vault has no local filesystem path.');
      const env = { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_MERGE_AUTOEDIT: 'no', LC_ALL: 'C' };
      if (process.platform === 'darwin') {
        env.PATH = `/opt/homebrew/bin:/usr/local/bin:${env.PATH || '/usr/bin:/bin:/usr/sbin:/sbin'}`;
      }
      const executable = process.platform === 'darwin' ? '/usr/bin/git'
        : process.platform === 'win32' ? 'git.exe' : 'git';
      const git = async (...args) => (await runFile(executable, args, {
        cwd: vaultPath, env, timeout: 600000, windowsHide: true, maxBuffer: 4 * 1024 * 1024,
      })).stdout.trim();
      await fs.mkdir(state, { recursive: true });
      try { await fs.mkdir(lock); ownsLock = true; }
      catch (error) {
        if (error.code === 'EEXIST') throw new Error('Another vault sync is running. Try again after it finishes.');
        throw error;
      }
      await git('--version');
      const optional = async (...args) => {
        try { return await git(...args); }
        catch (error) { if (error.code === 1) return ''; throw error; }
      };
      let root;
      try { root = await git('rev-parse', '--show-toplevel'); }
      catch (error) {
        if (!String(error.stderr).includes('not a git repository')) throw error;
        // A broken .git entry must never be mistaken for a fresh vault.
        try { await fs.lstat(path.join(vaultPath, '.git')); throw new Error('This vault has Git metadata that needs repair in a Git client.'); }
        catch (entryError) { if (entryError.code !== 'ENOENT') throw entryError; }
      }
      const readText = async (name) => {
        try { return await fs.readFile(path.join(vaultPath, name), 'utf8'); }
        catch (error) { if (error.code === 'ENOENT') return ''; throw error; }
      };
      if (root && await fs.realpath(root) !== await fs.realpath(vaultPath)) {
        throw new Error('The vault must be the root of its own Git repository. Move it outside the parent repository before setup.');
      }
      if (action === 'inspect') {
        const name = await optional('config', 'user.name');
        const email = await optional('config', 'user.email');
        let lfs = false;
        try { await git('lfs', 'version'); lfs = true; } catch { /* Show installation help. */ }
        this.setupState = { repository: !!root, name, email, lfs,
          pending: root ? await optional('config', '--local', '--get', 'gitSyncDesktop.setupPending') === 'true' : false,
          branch: root ? await git('branch', '--show-current') : 'main',
          remote: root ? redact(await optional('config', '--get', 'remote.origin.url')) : '',
          ignores: await readText('.gitignore'),
          excluded: root ? await git('ls-files', '--others', '--ignored', '--exclude-standard') : '',
          attributes: await readText('.gitattributes') };
        this.uploadPreview = root ? {
          remote: await optional('config', '--get', 'remote.origin.url'), branch: this.setupState.branch,
          text: `Destination: ${this.setupState.remote || '(not connected)'}\nBranch: ${this.setupState.branch}\n\nFiles included in the vault:\n${await git('ls-files', '--cached', '--others', '--exclude-standard')}\n\nPending changes:\n${await git('status', '--short') || '(none)'}`,
        } : null;
        return done(lfs ? 'Checks complete. Review the setup steps below.' : 'Git LFS is missing. Install it, restart Obsidian, then check again.');
      }
      if (!root && !['prepare'].includes(action)) {
        if (action === 'sync') new SetupModal(this.app, this).open();
        throw new Error('This vault is not set up yet. Open Set up vault sync to create its local repository.');
      }
      if (action === 'prepare') {
        if (root) {
          const metadata = await git('rev-parse', '--absolute-git-dir');
          for (const marker of ['MERGE_HEAD', 'MERGE_AUTOSTASH', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply', 'sequencer']) {
            try { await fs.access(path.join(metadata, marker)); }
            catch (error) { if (error.code === 'ENOENT') continue; throw error; }
            throw new Error('Finish the existing Git operation in a Git client before setup.');
          }
          if (await git('diff', '--name-only', '--diff-filter=U')) throw new Error('Resolve existing conflicts before setup.');
        }
        await git('lfs', 'version').catch(() => { throw new Error('Install Git LFS, restart Obsidian, then check again.'); });
        const name = (options.name || await optional('config', 'user.name')).trim();
        const email = (options.email || await optional('config', 'user.email')).trim();
        if (!name || !email || /[\r\n\0]/.test(name + email)) throw new Error('Enter your Git author name and email before setup.');
        const extensions = [...new Set(String(options.extensions ?? LFS_EXTENSIONS).toLowerCase().split(/[\s,]+/).filter(Boolean))];
        if (extensions.length > 64 || extensions.some(ext => !/^[a-z0-9]{1,8}$/.test(ext))) throw new Error('Use up to 64 extensions of 1–8 letters or digits, separated by spaces, without dots or wildcards.');
        if (!root) {
          status('Creating local repository');
          await git('init', '--initial-branch=main');
          root = vaultPath;
          await git('config', '--local', 'gitSyncDesktop.setupPending', 'true');
        } else if (await optional('config', '--local', '--get', 'gitSyncDesktop.setupPending') !== 'true') {
          return done('This vault already has a repository. Existing rules and history are preserved. Use Connect your repository, or the manual Git tools.');
        }
        if (await optional('config', 'core.hooksPath')) throw new Error('A custom Git hooks directory is configured. Set up LFS with your Git client to preserve those shared hooks.');
        await git('config', '--local', 'user.name', name);
        await git('config', '--local', 'user.email', email);
        status('Enabling attachment storage');
        await git('lfs', 'install', '--local');
        // Add defaults only for our fresh/retry setup; preserve all existing lines.
        for (const filename of ['.gitignore', '.gitattributes']) {
          try { if ((await fs.lstat(path.join(vaultPath, filename))).isSymbolicLink()) throw new Error(`${filename} is a symbolic link. Review it in a Git client before setup.`); }
          catch (error) { if (error.code !== 'ENOENT') throw error; }
        }
        const ignores = await readText('.gitignore');
        const missing = SETUP_IGNORES.filter(rule => !ignores.split(/\r?\n/).includes(rule));
        if (missing.length) await fs.appendFile(path.join(vaultPath, '.gitignore'), `${ignores && !ignores.endsWith('\n') ? '\n' : ''}${missing.join('\n')}\n`);
        // VaultBridge's matcher supports * and ?, but not bracket classes.
        // Explicit variants preserve mixed-case matching on both platforms.
        const patterns = extensions.flatMap(ext => [...ext].reduce((variants, character) =>
          variants.flatMap(prefix => character === character.toUpperCase() ? [prefix + character]
            : [prefix + character, prefix + character.toUpperCase()]), ['*.']));
        for (let i = 0; i < patterns.length; i += 128) await git('lfs', 'track', ...patterns.slice(i, i + 128));
        status('Saving first local checkpoint');
        await git('add', '--all');
        if (await git('diff', '--cached', '--name-only')) await git('commit', '-m', 'Set up vault sync');
        if (await git('status', '--porcelain')) throw new Error('Files changed during setup. Your checkpoint is safe; retry when editing settles.');
        await git('config', '--local', '--unset', 'gitSyncDesktop.setupPending');
        return done('Vault prepared. All unignored content and configuration are saved locally. Next: connect your repository. Nothing uploaded.');
      }
      if (await optional('config', '--local', '--get', 'gitSyncDesktop.setupPending') === 'true') throw new Error('Vault preparation is incomplete. Retry Set up this vault before syncing or uploading.');
      const gitDir = await git('rev-parse', '--absolute-git-dir');
      let pendingOperation = false;
      for (const marker of ['MERGE_HEAD', 'MERGE_AUTOSTASH', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply', 'sequencer']) {
        try { await fs.access(path.join(gitDir, marker)); }
        catch (error) { if (error.code === 'ENOENT') continue; throw error; }
        pendingOperation = true;
        if (action === 'status' || (action === 'finish' && marker === 'MERGE_HEAD')) continue;
        throw new Error('Git has an unfinished operation. Resolve conflicts, then use Finish resolved merge. Other recovery operations must be completed in a Git client.');
      }
      const conflicts = await git('diff', '--name-only', '--diff-filter=U');
      if (conflicts && action !== 'status') throw new Error('Some files still conflict. Resolve and stage them in a Git client, then use Finish resolved merge. Nothing was uploaded.');
      const branch = await git('branch', '--show-current');
      if (!branch) throw new Error('Check out a branch before syncing; Git is in detached HEAD state.');
      const origin = await optional('config', '--get', 'remote.origin.url');
      if (['connect', 'upload'].includes(action) && await optional('config', '--get-all', 'remote.origin.pushurl')) throw new Error('This repository has a separate push destination. Review its remote configuration in a Git client before using setup; existing destinations were preserved.');
      if (action === 'upload' && (options.expectedRemote !== origin || options.expectedBranch !== branch)) throw new Error('The destination or branch changed. Review the upload again before proceeding.');
      if (action === 'connect') {
        const url = validateRemote(options.url);
        if (origin && origin !== url && options.replace !== true) throw new Error('A remote is already configured. Use Replace remote explicitly to change it.');
        status('Checking repository access');
        const refs = await git('ls-remote', '--refs', url);
        if (refs) {
          const head = await git('rev-parse', 'HEAD');
          await git('fetch', '--no-tags', url, `refs/heads/${branch}`);
          try { await git('merge-base', head, 'FETCH_HEAD'); }
          catch { throw new Error('This repository contains unrelated history. Create an empty remote, or clone the existing repository into a separate vault.'); }
        }
        await git('remote', origin ? 'set-url' : 'add', 'origin', url);
        return done(refs ? 'Repository reachable and connected. Use Sync now to combine and upload related history.' : 'Empty repository reachable and connected. Next: Upload vault. Write access and attachment transfer will be checked during upload.');
      }
      if (!origin && ['sync', 'status', 'push', 'pull', 'merge', 'upload'].includes(action)) {
        if (action === 'sync') new SetupModal(this.app, this).open();
        return done('This vault is on this computer only; no remote is connected. Use Commit locally to save edits, or Set up vault sync to connect a remote.');
      }
      const localOnly = action === 'commit' || action === 'finish';
      if (!localOnly) await git('remote', 'get-url', 'origin');
      if (action !== 'status') {
        try { await git('lfs', 'version'); }
        catch { throw new Error('Git LFS is required. Install Git LFS and make it available on PATH, then retry.'); }
      }
      if (['status', 'push', 'upload'].includes(action)) {
        status('Checking server branch');
        const refs = await git('ls-remote', '--refs', 'origin');
        if (!refs || action === 'upload') {
          if (refs) throw new Error('The remote now contains history. Use Sync now for related history, or connect an empty repository.');
          if (action !== 'upload') return done('The remote is empty. Open Set up vault sync and choose Upload vault for the first upload.');
          status('Saving local changes');
          await git('add', '--all');
          if (await git('diff', '--cached', '--name-only')) await git('commit', '-m', `vault sync: ${new Date().toISOString()}`);
          if (await git('status', '--porcelain')) throw new Error('The vault changed while saving. Retry after editing settles.');
          if (await git('ls-remote', '--refs', 'origin')) throw new Error('The remote changed during setup. Check its history before uploading.');
          status('Uploading vault and attachments');
          await git('push', '--set-upstream', 'origin', `HEAD:refs/heads/${branch}`);
          const head = await git('rev-parse', 'HEAD');
          const remote = await git('ls-remote', '--exit-code', 'origin', `refs/heads/${branch}`);
          if (remote.split(/\s+/)[0] !== head) throw new Error('The server changed again. Use Sync now to check the latest work.');
          return done(await git('status', '--porcelain') ? 'Vault uploaded; newer local edits need Sync now.' : `Ready to sync · ${head.slice(0, 8)}. Vault and LFS upload completed.`);
        }
      }
      const fetchRemote = async () => {
        status('Getting remote changes');
        await git('fetch', '--no-tags', 'origin', `+refs/heads/${branch}:refs/remotes/origin/${branch}`);
        return git('rev-parse', `refs/remotes/origin/${branch}`);
      };
      if (action === 'status') {
        await fetchRemote();
        const counts = (await git('rev-list', '--left-right', '--count', `HEAD...refs/remotes/origin/${branch}`)).split(/\s+/).map(Number);
        const dirty = !!(await git('status', '--porcelain'));
        const next = pendingOperation ? 'Finish the current Git operation before starting another. Resolve and stage any conflicts first.' : conflicts ? 'Resolve conflicts in a Git client, then finish the merge.'
          : dirty ? 'Next: commit locally, or use Sync now.'
            : counts[0] && counts[1] ? 'Next: combine computer and server changes.'
              : counts[1] ? 'Next: pull newer server changes.' : counts[0] ? 'Next: push saved changes.' : 'Everything is up to date.';
        return done(`${dirty ? 'Unsaved local changes. ' : 'Local files are saved. '}${counts[0]} saved commits to upload; ${counts[1]} server commits to receive. ${next}`);
      }
      if (action === 'finish') {
        try { await fs.access(path.join(gitDir, 'MERGE_HEAD')); }
        catch { throw new Error('There is no merge to finish.'); }
        status('Finishing resolved merge');
        await git('commit', '--no-edit');
        return done(`Merge saved locally · ${(await git('rev-parse', 'HEAD')).slice(0, 8)}. Nothing uploaded. Use Push when ready.`);
      }
      if (['pull', 'push'].includes(action)) {
        if (await git('status', '--porcelain')) throw new Error('Save your edits with Commit locally first. No files were pulled or uploaded.');
        const remoteHead = await fetchRemote();
        if (action === 'pull') {
          const ahead = Number(await git('rev-list', '--count', `${remoteHead}..HEAD`));
          if (ahead) throw new Error('This computer has saved work the server does not have. Use Merge to combine both histories, or Push if only this computer changed.');
          status('Bringing newer server changes here');
          await git('merge', '--ff-only', '--no-autostash', remoteHead);
          return done(`Server changes received · ${(await git('rev-parse', 'HEAD')).slice(0, 8)}. Nothing uploaded.`);
        }
        const behind = Number(await git('rev-list', '--count', `HEAD..${remoteHead}`));
        if (behind) throw new Error('The server has newer work. Pull or Merge first, then Push. Server work has not been overwritten.');
      }
      // Network first for manual merging. A connection failure changes no local files.
      const mergeHead = ['merge', 'force'].includes(action) ? await fetchRemote() : null;
      if (action !== 'push') {
        status('Saving local changes');
        await git('add', '--all');
        if (await git('diff', '--cached', '--name-only')) {
          await git('commit', '-m', `vault sync: ${new Date().toISOString()}`);
        }
        if (await git('status', '--porcelain')) {
          throw new Error('The vault changed while saving. Your checkpoint is safe; run sync again.');
        }
        if (action === 'commit') return done(`Saved locally · ${(await git('rev-parse', 'HEAD')).slice(0, 8)}. Nothing uploaded.`);
      }
      if (mergeHead) {
        const checkpoint = `refs/vault-git-sync/checkpoints/${Date.now()}`;
        const checkpointHead = await git('rev-parse', 'HEAD');
        await git('update-ref', checkpoint, checkpointHead);
        status('Combining computer and server changes');
        const args = ['merge', '--no-edit', '--no-autostash'];
        if (action === 'force') args.push(`-X${options.preference}`);
        try { await git(...args, mergeHead); }
        catch (error) { throw new Error(`Merge stopped. Restore point ${checkpointHead.slice(0, 8)} protects your saved computer version. Nothing uploaded. ${String(error.stderr || error.message).trim()}`, { cause: error }); }
        return done(`Combined locally · ${(await git('rev-parse', 'HEAD')).slice(0, 8)}. Nothing uploaded. Restore point: ${checkpointHead.slice(0, 8)}. Use Push when ready.`);
      }
      if (action === 'sync') {
        status('Getting remote changes');
        if (!await git('ls-remote', '--refs', 'origin')) {
          new SetupModal(this.app, this).open();
          return done('Saved locally. The remote is empty; review the first upload in Set up vault sync.');
        }
        await git('pull', '--no-rebase', '--no-autostash', '--no-edit', 'origin', branch);
      }
      status('Uploading changes');
      await git('push', 'origin', `HEAD:refs/heads/${branch}`);
      status('Verifying sync');
      const head = await git('rev-parse', 'HEAD');
      const remote = await git('ls-remote', '--exit-code', 'origin', `refs/heads/${branch}`);
      if (remote.split(/\s+/)[0] !== head) {
        throw new Error('The server changed again. Run sync again to receive the latest edits.');
      }
      const changed = await git('status', '--porcelain');
      done(changed ? 'Checkpoint uploaded; newer local edits need another sync.' : `${action === 'push' ? 'Saved changes uploaded' : 'Vault synced'} · ${head.slice(0, 8)}`);
      return !changed;
    } catch (error) {
      const detail = redact(String(error.stderr || error.message || error)).trim();
      this.report(`${phase} stopped: ${detail.slice(-1800)}`);
      new Notice(this.feedback, 20000);
      return false;
    } finally {
      if (ownsLock) {
        try { await fs.rmdir(lock); }
        catch { new Notice('Sync ended, but its lock could not be released. Check the desktop sync helper.', 10000); }
      }
      progress.hide();
      this.syncing = false;
      this.report(this.feedback);
    }
  }
};

const ACTIONS = [
  { id: 'status', title: 'Check what needs doing', button: 'Check status', description: 'Checks the server and tells you whether to save, pull, combine, or upload. Does not change your notes.' },
  { id: 'commit', title: 'Save on this computer only', button: 'Commit locally', description: 'Saves every changed or new, unignored file as a local restore point. Works offline and uploads nothing.' },
  { id: 'pull', title: 'Bring newer server changes here', button: 'Pull', description: 'Downloads changes when this computer has no unsaved edits or competing commits. Does not upload or rewrite your history.' },
  { id: 'merge', title: 'Combine computer and server changes', button: 'Merge', description: 'Checks the server, saves your edits, then combines both histories here. Conflicts stop for review. Nothing is uploaded.' },
  { id: 'push', title: 'Upload saved work', button: 'Push', description: 'Checks the server, then uploads existing local commits. Save your edits first. Newer server work blocks the upload.' },
  { id: 'finish', title: 'Finish a resolved merge', button: 'Finish merge', description: 'After resolving and staging conflicted files in a Git client, saves the merge locally. Uploading is still a separate step.' },
];

function redact(value) {
  return value.replace(/(https?:\/\/)[^\s/]*@/gi, '$1[redacted]@').replace(/([?&](?:token|access_token|password)=)[^\s&]+/gi, '$1[redacted]');
}

function validateRemote(value) {
  const url = String(value || '').trim();
  if (!url || /[\s\0]/.test(url) || url.startsWith('-')) throw new Error('Paste an HTTPS or SSH clone URL.');
  if (/^https:\/\//i.test(url)) {
    const parsed = new URL(url);
    if (parsed.username || parsed.password || parsed.search || parsed.hash || !parsed.hostname || parsed.pathname === '/') throw new Error('Use a plain clone URL without credentials, query parameters, or fragments. Sign in through your system Git credentials.');
  } else if (/^ssh:\/\//i.test(url)) {
    const parsed = new URL(url);
    if (parsed.password || parsed.search || parsed.hash || !parsed.hostname || parsed.pathname === '/') throw new Error('Use an SSH clone URL without passwords or query parameters.');
  } else if (!/^[\w.-]+@[\w.-]+:[^\s]+$/.test(url)) {
    throw new Error('Use an HTTPS or SSH clone URL from your repository host.');
  }
  return url;
}

class SetupModal extends Modal {
  constructor(app, plugin) { super(app); this.plugin = plugin; this.fields = { extensions: LFS_EXTENSIONS }; }
  onOpen() {
    this.setTitle('Set up vault sync');
    this.closed = false;
    this.render();
    // A ribbon action can still own the shared operation lock while opening us.
    this.timer = setTimeout(() => this.check(), 0);
  }
  async check() {
    await this.plugin.runAction('inspect');
    if (this.closed) return;
    const state = this.plugin.setupState;
    if (state) for (const key of ['name', 'email', 'remote']) this.fields[key] ??= state[key];
    this.render();
  }
  async act(action, options) {
    const success = await this.plugin.runAction(action, options);
    const feedback = this.plugin.feedback;
    if (success) {
      await this.plugin.runAction('inspect');
      this.plugin.report(feedback);
      this.reviewed = null;
    }
    if (!this.closed) this.render();
  }
  render() {
    this.cleanup?.();
    const shell = this.contentEl;
    let container = shell;
    container.empty();
    container.addClass('vault-git-sync-tools');
    const state = this.plugin.setupState;
    const buttons = [];
    const feedback = container.createDiv({ cls: 'vault-git-sync-feedback', attr: { role: 'status', 'aria-live': 'polite' } });
    const button = (name, description, label, callback) => new Setting(container).setName(name).setDesc(description).addButton(control => {
      buttons.push(control); control.setButtonText(label).onClick(callback);
    });
    const field = (name, description, key) => new Setting(container).setName(name).setDesc(description).addText(control => {
      control.setValue(this.fields[key] || '').onChange(value => { this.fields[key] = value; });
    });
    const step = (title, open) => {
      container = shell.createEl('details', { cls: 'vault-git-sync-step' });
      container.open = open;
      container.createEl('summary', { text: title });
    };
    step('1. Prepare this vault', !state?.repository || state.pending);
    container.createEl('p', { text: 'All unignored vault content is included: notes, every attachment type, hidden files, settings, themes, and plugins. LFS rules change storage, not which files are included.' });
    container.createEl('p', { text: state ? `Git available. Git LFS ${state.lfs ? 'available' : 'missing'}. ${state.repository ? 'Existing repository detected; its rules and history are preserved.' : 'A new local repository will use branch main.'}` : 'Check this computer before setup.' });
    container.createEl('p', { text: 'Install Git and Git LFS using the official guides below, then restart Obsidian. For sign-in, use your Git client or system credential manager; this plugin does not store passwords or tokens.' });
    for (const [text, href] of [['Install Git', 'https://git-scm.com/downloads'], ['Install Git LFS', 'https://git-lfs.com/'], ['GitHub authentication', 'https://docs.github.com/en/authentication'], ['Forgejo setup', 'https://forgejo.org/docs/latest/user/']]) container.createEl('a', { text: `${text} ↗ `, href });
    button('Computer checks', 'You can repeat these checks after installing software or fixing sign-in.', 'Check again', () => this.check());
    field('Author name', 'Shown on your Git commits; saved only in this repository.', 'name');
    field('Author email', 'Use your preferred commit email, including a host-provided private email if desired.', 'email');
    field('Attachment extensions for LFS', 'Space-separated extensions. Other file types still sync through ordinary Git. Applied only to a new repository.', 'extensions');
    const preview = container.createEl('details');
    preview.createEl('summary', { text: 'Review exclusions and existing attachment rules' });
    preview.createEl('p', { text: 'Fresh vaults exclude the following disposable files. Existing .gitignore rules are preserved and may exclude additional content. Git also respects global ignore rules and .git/info/exclude.' });
    preview.createEl('pre', { text: SETUP_IGNORES.join('\n') });
    preview.createEl('pre', { text: `Existing .gitignore:\n${state?.ignores || '(none)'}\n\nExisting .gitattributes:\n${state?.attributes || '(none)'}\n\nCurrently ignored files (existing repository):\n${state?.excluded || '(none detected; check again after preparation)'}` });
    button('Save on this computer', 'Creates a repository and first checkpoint with the reviewed rules. Nothing uploads.', 'Set up this vault', async () => {
      await this.act('prepare', this.fields);
    });
    step('2. Connect your repository', !!state?.repository && !state?.remote);
    container.createEl('p', { text: 'On GitHub or your Forgejo server, create a private repository. Leave it empty: do not add a README, license, or .gitignore. Copy its HTTPS or SSH clone URL below. Complete sign-in through your Git client first.' });
    container.createEl('p', { text: `Current destination: ${state?.remote || 'not checked or not connected'}. Branch: ${state?.branch || 'main'}.` });
    field('Repository URL', 'Uses origin in local Git configuration. Do not paste tokens or passwords.', 'remote');
    button('Test and connect', 'Checks read access before saving the remote. Upload will verify write access and LFS transfer.', 'Connect and check', () => this.act('connect', { url: this.fields.remote }));
    if (state?.remote) button('Change destination', 'Explicitly replaces the current origin after checking the new repository.', 'Replace remote', () => this.act('connect', { url: this.fields.remote, replace: true }));
    step('3. Upload and verify', !!state?.remote);
    container.createEl('p', { text: 'Review the current destination and files before the first upload. This saves all unignored changes and uploads the vault and LFS attachments to an empty remote. For a connected repository with related history, use Sync now.' });
    button('Review first upload', 'Shows the actual configured destination, branch, and pending files.', 'Review upload', async () => {
      const success = await this.plugin.runAction('inspect');
      this.reviewed = success ? this.plugin.uploadPreview : null;
      if (!this.closed) this.render();
    });
    if (this.reviewed) {
      container.createEl('pre', { text: this.reviewed.text });
      button('Start first upload', 'Uploads to the reviewed destination. If it has changed, review it again.', 'Upload vault', () => this.act('upload', { expectedRemote: this.reviewed.remote, expectedBranch: this.reviewed.branch }));
    }
    button('Continue normal syncing', 'Saves, combines related history, and uploads.', 'Sync now', () => this.plugin.syncVault());
    const refresh = () => {
      feedback.textContent = this.plugin.feedback;
      feedback.setAttribute('aria-busy', String(this.plugin.syncing));
      for (const control of buttons) control.setDisabled(this.plugin.syncing);
    };
    this.plugin.listeners.add(refresh); refresh();
    this.cleanup = () => this.plugin.listeners.delete(refresh);
  }
  onClose() { this.closed = true; clearTimeout(this.timer); this.cleanup?.(); this.contentEl.empty(); }
}

function renderTools(container, plugin) {
  container.empty();
  container.addClass('vault-git-sync-tools');
  container.createEl('p', { text: 'Usually, Sync now is all you need. Use the individual steps when you want more control.' });
  const feedback = container.createDiv({ cls: 'vault-git-sync-feedback', attr: { role: 'status', 'aria-live': 'polite' } });
  const buttons = [];
  new Setting(container).setName('Vault setup and remote configuration').setDesc('Prepare the whole vault, connect a repository, and make the first upload.')
    .addButton(button => { buttons.push(button); button.setButtonText('Set up vault sync').onClick(() => new SetupModal(plugin.app, plugin).open()); });
  new Setting(container).setName('Save, combine, and upload').setDesc('Creates a local checkpoint, brings in server changes, and uploads the combined result. Stops if there are conflicts.')
    .addButton(button => { buttons.push(button); button.setButtonText('Sync now').setCta().onClick(() => plugin.syncVault()); });
  for (const action of ACTIONS) {
    new Setting(container).setName(action.title).setDesc(action.description).addButton(button => {
      buttons.push(button); button.setButtonText(action.button).onClick(() => plugin.runAction(action.id));
    });
  }
  const advanced = container.createEl('details', { cls: 'vault-git-sync-advanced' });
  advanced.createEl('summary', { text: 'Advanced: conflicting edits' });
  new Setting(advanced).setName('Force merge with a conflict preference')
    .setDesc('Combines both histories, preferring one side only where edits conflict. Creates a recovery checkpoint first. Does not force-push or replace the entire vault.')
    .addButton(button => { buttons.push(button); button.setButtonText('Choose preference…').onClick(() => new ForceMergeModal(plugin.app, plugin).open()); });
  const refresh = () => {
    feedback.textContent = plugin.feedback;
    feedback.setAttribute('aria-busy', String(plugin.syncing));
    for (const button of buttons) button.setDisabled(plugin.syncing);
  };
  plugin.listeners.add(refresh);
  refresh();
  return () => plugin.listeners.delete(refresh);
}

class SyncToolsModal extends Modal {
  constructor(app, plugin) { super(app); this.plugin = plugin; }
  onOpen() { this.setTitle('Vault Git tools'); this.cleanup = renderTools(this.contentEl, this.plugin); }
  onClose() { this.cleanup?.(); this.contentEl.empty(); }
}

class SyncSettingsTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.plugin = plugin; }
  getSettingDefinitions() {
    return [{ name: 'Manual Git actions', aliases: ['commit', 'pull', 'merge', 'force merge', 'push', 'sync'],
      render: (setting) => renderTools(setting.settingEl, this.plugin) }];
  }
  display() { this.cleanup?.(); this.cleanup = renderTools(this.containerEl, this.plugin); }
  hide() { this.cleanup?.(); this.cleanup = null; }
}

class ForceMergeModal extends Modal {
  constructor(app, plugin) { super(app); this.plugin = plugin; }
  onOpen() {
    this.setTitle('Choose which conflicting edits to keep');
    this.contentEl.createEl('p', { text: 'Both histories are combined. Non-conflicting edits from both sides stay. For conflicting text, choose which side wins; for conflicting binary files, the chosen side supplies the whole file. Some conflicts still require manual resolution.' });
    this.contentEl.createEl('p', { text: 'Your current computer version is saved in a recovery checkpoint first. This never uploads or force-pushes. If a merge is already unfinished, resolve it before starting another.' });
    new Setting(this.contentEl).setName('Keep this computer’s conflicting edits')
      .addButton(button => button.setButtonText('Merge — prefer computer').onClick(() => this.confirm('ours')));
    new Setting(this.contentEl).setName('Keep the server’s conflicting edits')
      .addButton(button => button.setButtonText('Merge — prefer server').onClick(() => this.confirm('theirs')));
    new Setting(this.contentEl).addButton(button => button.setButtonText('Cancel').onClick(() => this.close()));
  }
  confirm(preference) { this.close(); void this.plugin.runAction('force', { preference }); }
  onClose() { this.contentEl.empty(); }
}
