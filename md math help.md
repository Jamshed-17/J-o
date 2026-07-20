# Математические формулы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D1%8B)

Markdown поддерживает вставку математических формул с использованием синтаксиса LaTeX, предоставляя профессиональные возможности математического выражения для технических документов, академических статей и учебных материалов.

## Основной синтаксис математических формул LaTeX[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%BE%D0%B8-%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%81-%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB-latex)

### Встроенные формулы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B2%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D1%8B)

Используйте одинарные знаки доллара `$` для заключения формул:

markdown

```
Это встроенная формула: $E = mc^2$, которая является уравнением массы-энергии Эйнштейна.

Площадь круга равна $A = \pi r^2$, где $r$ - радиус.

Решение квадратного уравнения: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
```

**Результат отображения:**

Это встроенная формула: $E = mc^2$, которая является уравнением массы-энергии Эйнштейна.

Площадь круга равна $A = \pi r^2$, где $r$ - радиус.

Решение квадратного уравнения: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### Блочные формулы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B1%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B5-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D1%8B)

Используйте двойные знаки доллара `$$` для заключения формул, которые будут отображаться на отдельной центрированной строке:

markdown

```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$
```

**Результат отображения:**

$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$

$$ \sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6} $$

$$ \lim_{x \to 0} \frac{\sin x}{x} = 1 $$

## Основные математические элементы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B)

### Верхние и нижние индексы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%BD%D0%B8%D0%B6%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D1%8B)

markdown

```
<!-- Верхние индексы -->
$x^2$, $e^{i\pi}$, $2^{10}$

<!-- Нижние индексы -->
$x_1$, $a_{ij}$, $\log_2 n$

<!-- Комбинированные -->
$x_1^2$, $a_{i,j}^{(k)}$, $\sum_{i=1}^n x_i^2$
```

**Результат отображения:**

$x^2$, $e^{i\pi}$, $2^{10}$

$x_1$, $a_{ij}$, $\log_2 n$

$x_1^2$, $a_{i,j}^{(k)}$, $\sum_{i=1}^n x_i^2$

### Дроби[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B4%D1%80%D0%BE%D0%B1%D0%B8)

markdown

```
<!-- Простые дроби -->
$\frac{1}{2}$, $\frac{a}{b}$, $\frac{x+y}{x-y}$

<!-- Цепные дроби -->
$\frac{1}{1 + \frac{1}{2 + \frac{1}{3 + \cdots}}}$

<!-- Сложные дроби -->
$\frac{\partial^2 f}{\partial x^2}$, $\frac{d}{dx}\left(\frac{1}{x}\right)$
```

**Результат отображения:**

$\frac{1}{2}$, $\frac{a}{b}$, $\frac{x+y}{x-y}$

$\frac{1}{1 + \frac{1}{2 + \frac{1}{3 + \cdots}}}$

$\frac{\partial^2 f}{\partial x^2}$, $\frac{d}{dx}\left(\frac{1}{x}\right)$

### Корни[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BA%D0%BE%D1%80%D0%BD%D0%B8)

markdown

```
<!-- Квадратные корни -->
$\sqrt{2}$, $\sqrt{x^2 + y^2}$

<!-- Корни n-й степени -->
$\sqrt[3]{8}$, $\sqrt[n]{x}$

<!-- Сложные корни -->
$\sqrt{\frac{a}{b}}$, $\sqrt{1 + \sqrt{1 + \sqrt{1 + \cdots}}}$
```

**Результат отображения:**

$\sqrt{2}$, $\sqrt{x^2 + y^2}$

$\sqrt[3]{8}$, $\sqrt[n]{x}$

$\sqrt{\frac{a}{b}}$, $\sqrt{1 + \sqrt{1 + \sqrt{1 + \cdots}}}$

## Символы и операторы[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8B-%D0%B8-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B)

### Греческие буквы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B3%D1%80%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D0%B1%D1%83%D0%BA%D0%B2%D1%8B)

markdown

```
<!-- Строчные греческие буквы -->
$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\zeta$, $\eta$, $\theta$

$\iota$, $\kappa$, $\lambda$, $\mu$, $\nu$, $\xi$, $\pi$, $\rho$

$\sigma$, $\tau$, $\upsilon$, $\phi$, $\chi$, $\psi$, $\omega$

<!-- Заглавные греческие буквы -->
$\Alpha$, $\Beta$, $\Gamma$, $\Delta$, $\Epsilon$, $\Zeta$, $\Eta$, $\Theta$

$\Lambda$, $\Xi$, $\Pi$, $\Sigma$, $\Phi$, $\Psi$, $\Omega$
```

**Результат отображения:**

$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\zeta$, $\eta$, $\theta$

$\iota$, $\kappa$, $\lambda$, $\mu$, $\nu$, $\xi$, $\pi$, $\rho$

$\sigma$, $\tau$, $\upsilon$, $\phi$, $\chi$, $\psi$, $\omega$

$\Alpha$, $\Beta$, $\Gamma$, $\Delta$, $\Epsilon$, $\Zeta$, $\Eta$, $\Theta$

$\Lambda$, $\Xi$, $\Pi$, $\Sigma$, $\Phi$, $\Psi$, $\Omega$

### Операторы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B)

markdown

```
<!-- Основные операции -->
$+$, $-$, $\times$, $\div$, $\pm$, $\mp$

<!-- Операции сравнения -->
$=$, $\neq$, $<$, $>$, $\leq$, $\geq$, $\ll$, $\gg$

<!-- Логические операции -->
$\land$, $\lor$, $\lnot$, $\implies$, $\iff$

<!-- Операции над множествами -->
$\in$, $\notin$, $\subset$, $\supset$, $\cup$, $\cap$, $\emptyset$

<!-- Другие символы -->
$\infty$, $\partial$, $\nabla$, $\propto$, $\approx$, $\equiv$
```

**Результат отображения:**

$+$, $-$, $\times$, $\div$, $\pm$, $\mp$

$=$, $\neq$, $<$, $>$, $\leq$, $\geq$, $\ll$, $\gg$

$\land$, $\lor$, $\lnot$, $\implies$, $\iff$

$\in$, $\notin$, $\subset$, $\supset$, $\cup$, $\cap$, $\emptyset$

$\infty$, $\partial$, $\nabla$, $\propto$, $\approx$, $\equiv$

## Продвинутые математические структуры[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BF%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%83%D1%82%D1%8B%D0%B5-%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D1%8B)

### Суммирование и интегрирование[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D1%83%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)

markdown

```
<!-- Суммирование -->
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

$$\sum_{k=0}^{\infty} \frac{x^k}{k!} = e^x$$

<!-- Интегрирование -->
$$\int_a^b f(x) dx$$

$$\oint_C \mathbf{F} \cdot d\mathbf{r}$$

$$\iint_D f(x,y) \, dx \, dy$$

$$\iiint_V f(x,y,z) \, dx \, dy \, dz$$

<!-- Пределы -->
$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$

$$\lim_{x \to 0^+} \frac{1}{x} = +\infty$$
```

**Результат отображения:**

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

$$\sum_{k=0}^{\infty} \frac{x^k}{k!} = e^x$$

$$\int_a^b f(x) dx$$

$$\oint_C \mathbf{F} \cdot d\mathbf{r}$$

$$\iint_D f(x,y) , dx , dy$$

$$\iiint_V f(x,y,z) , dx , dy , dz$$

$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$

$$\lim_{x \to 0^+} \frac{1}{x} = +\infty$$

### Матрицы и определители[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B-%D0%B8-%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D0%B8)

markdown

```
<!-- Простая матрица -->
$$
\begin{matrix}
a & b \\
c & d
\end{matrix}
$$

<!-- Матрица в скобках -->
$$
\begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{pmatrix}
$$

<!-- Определитель -->
$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc
$$

<!-- Система уравнений -->
$$
\begin{cases}
x + y = 1 \\
2x - y = 0
\end{cases}
$$

<!-- Большая матрица -->
$$
\begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1
\end{bmatrix}
$$
```

**Результат отображения:**

$$ \begin{matrix} a & b \ c & d \end{matrix} $$

$$ \begin{pmatrix} 1 & 2 & 3 \ 4 & 5 & 6 \ 7 & 8 & 9 \end{pmatrix} $$

$$ \begin{vmatrix} a & b \ c & d \end{vmatrix} = ad - bc $$

$$ \begin{cases} x + y = 1 \ 2x - y = 0 \end{cases} $$

$$ \begin{bmatrix} 1 & 0 & \cdots & 0 \ 0 & 1 & \cdots & 0 \ \vdots & \vdots & \ddots & \vdots \ 0 & 0 & \cdots & 1 \end{bmatrix} $$

### Многострочные формулы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE%D1%81%D1%82%D1%80%D0%BE%D1%87%D0%BD%D1%8B%D0%B5-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D1%8B)

markdown

```
<!-- Выровненные многострочные формулы -->
$$
\begin{align}
f(x) &= ax^2 + bx + c \\
&= a(x^2 + \frac{b}{a}x) + c \\
&= a(x + \frac{b}{2a})^2 + c - \frac{b^2}{4a}
\end{align}
$$

<!-- Кусково заданные функции -->
$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

<!-- Нумерованные формулы -->
$$
E = mc^2 \tag{1}
$$

$$
F = ma \tag{2}
$$
```

**Результат отображения:**

$$ \begin{align} f(x) &= ax^2 + bx + c \ &= a(x^2 + \frac{b}{a}x) + c \ &= a(x + \frac{b}{2a})^2 + c - \frac{b^2}{4a} \end{align} $$

$$ f(x) = \begin{cases} x^2 & \text{if } x \geq 0 \ -x^2 & \text{if } x < 0 \end{cases} $$

$$ E = mc^2 \tag{1} $$

$$ F = ma \tag{2} $$

## Шрифты и стили[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%88%D1%80%D0%B8%D1%84%D1%82%D1%8B-%D0%B8-%D1%81%D1%82%D0%B8%D0%BB%D0%B8)

### Математические шрифты[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%88%D1%80%D0%B8%D1%84%D1%82%D1%8B)

markdown

```
<!-- Жирный -->
$\mathbf{A}$, $\mathbf{x}$, $\boldsymbol{\alpha}$

<!-- Курсив (по умолчанию) -->
$A$, $x$, $\alpha$

<!-- Двойной штрих -->
$\mathbb{R}$, $\mathbb{C}$, $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$

<!-- Каллиграфический -->
$\mathcal{A}$, $\mathcal{B}$, $\mathcal{F}$, $\mathcal{L}$

<!-- Скрипт -->
$\mathscr{A}$, $\mathscr{B}$, $\mathscr{F}$, $\mathscr{L}$

<!-- Моноширинный -->
$\mathtt{text}$, $\mathtt{ABC}$

<!-- Римский -->
$\mathrm{d}x$, $\mathrm{sin}$, $\mathrm{cos}$
```

**Результат отображения:**

$\mathbf{A}$, $\mathbf{x}$, $\boldsymbol{\alpha}$

$A$, $x$, $\alpha$

$\mathbb{R}$, $\mathbb{C}$, $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$

$\mathcal{A}$, $\mathcal{B}$, $\mathcal{F}$, $\mathcal{L}$

$\mathscr{A}$, $\mathscr{B}$, $\mathscr{F}$, $\mathscr{L}$

$\mathtt{text}$, $\mathtt{ABC}$

$\mathrm{d}x$, $\mathrm{sin}$, $\mathrm{cos}$

### Управление размером[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%D0%BE%D0%BC)

markdown

```
<!-- Разные размеры -->
$\tiny{tiny}$ $\small{small}$ $\normalsize{normal}$ $\large{large}$ $\Large{Large}$ $\LARGE{LARGE}$ $\huge{huge}$

<!-- Использование в формулах -->
$$\Large \sum_{i=1}^{n} \small x_i = \normalsize X$$
```

**Результат отображения:**

$\tiny{tiny}$ $\small{small}$ $\normalsize{normal}$ $\large{large}$ $\Large{Large}$ $\LARGE{LARGE}$ $\huge{huge}$

$$\Large \sum_{i=1}^{n} \small x_i = \normalsize X$$

## Специальные символы и обозначения[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8B-%D0%B8-%D0%BE%D0%B1%D0%BE%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F)

### Стрелки[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%BA%D0%B8)

markdown

```
<!-- Одинарные стрелки -->
$\leftarrow$, $\rightarrow$, $\uparrow$, $\downarrow$

<!-- Двойные стрелки -->
$\leftrightarrow$, $\updownarrow$

<!-- Длинные стрелки -->
$\longleftarrow$, $\longrightarrow$, $\longleftrightarrow$

<!-- Двойные линейные стрелки -->
$\Leftarrow$, $\Rightarrow$, $\Leftrightarrow$

<!-- Специальные стрелки -->
$\mapsto$, $\to$, $\gets$, $\hookrightarrow$, $\leadsto$
```

**Результат отображения:**

$\leftarrow$, $\rightarrow$, $\uparrow$, $\downarrow$

$\leftrightarrow$, $\updownarrow$

$\longleftarrow$, $\longrightarrow$, $\longleftrightarrow$

$\Leftarrow$, $\Rightarrow$, $\Leftrightarrow$

$\mapsto$, $\to$, $\gets$, $\hookrightarrow$, $\leadsto$

### Верхние индексы и украшения[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D1%8B-%D0%B8-%D1%83%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F)

markdown

```
<!-- Шляпка -->
$\hat{a}$, $\widehat{abc}$

<!-- Тильда -->
$\tilde{a}$, $\widetilde{abc}$

<!-- Верхняя черта -->
$\bar{a}$, $\overline{abc}$

<!-- Подчеркивание -->
$\underline{abc}$

<!-- Векторная стрелка -->
$\vec{a}$, $\overrightarrow{AB}$

<!-- Точка -->
$\dot{a}$, $\ddot{a}$, $\dddot{a}$
```

**Результат отображения:**

$\hat{a}$, $\widehat{abc}$

$\tilde{a}$, $\widetilde{abc}$

$\bar{a}$, $\overline{abc}$

$\underline{abc}$

$\vec{a}$, $\overrightarrow{AB}$

$\dot{a}$, $\ddot{a}$, $\dddot{a}$

## Примеры сложных формул[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D1%85-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB)

### Физические формулы[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%84%D0%B8%D0%B7%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D1%8B)

markdown

```
<!-- Уравнение Шрёдингера -->
$$i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)$$

<!-- Уравнения Максвелла -->
$$
\begin{align}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{align}
$$

<!-- Преобразование Лоренца -->
$$
\begin{pmatrix}
ct' \\
x' \\
y' \\
z'
\end{pmatrix} = 
\begin{pmatrix}
\gamma & -\gamma v/c & 0 & 0 \\
-\gamma v/c & \gamma & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
ct \\
x \\
y \\
z
\end{pmatrix}
$$
```

**Результат отображения:**

$$i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)$$

$$ \begin{align} \nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \ \nabla \cdot \mathbf{B} &= 0 \ \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \ \nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t} \end{align} $$

$$ \begin{pmatrix} ct' \ x' \ y' \ z' \end{pmatrix} = \begin{pmatrix} \gamma & -\gamma v/c & 0 & 0 \ -\gamma v/c & \gamma & 0 & 0 \ 0 & 0 & 1 & 0 \ 0 & 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} ct \ x \ y \ z \end{pmatrix} $$

### Математические теоремы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%82%D0%B5%D0%BE%D1%80%D0%B5%D0%BC%D1%8B)

markdown

```
<!-- Преобразование Фурье -->
$$\mathcal{F}\{f(t)\} = F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

<!-- Ряд Тейлора -->
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$$

<!-- Формула Эйлера -->
$$e^{i\theta} = \cos\theta + i\sin\theta$$

<!-- Гауссов интеграл -->
$$\int_{-\infty}^{\infty} e^{-ax^2} dx = \sqrt{\frac{\pi}{a}} \quad (a > 0)$$

<!-- Теорема Байеса -->
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$
```

**Результат отображения:**

$$\mathcal{F}{f(t)} = F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$$

$$e^{i\theta} = \cos\theta + i\sin\theta$$

$$\int_{-\infty}^{\infty} e^{-ax^2} dx = \sqrt{\frac{\pi}{a}} \quad (a > 0)$$

$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

### Сложность алгоритмов[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C-%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%D0%BE%D0%B2)

markdown

```
<!-- Временная сложность -->
$$O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$$

<!-- Рекуррентное соотношение -->
$$T(n) = \begin{cases}
1 & \text{if } n = 1 \\
2T(n/2) + O(n) & \text{if } n > 1
\end{cases}$$

<!-- Основная теорема -->
$$T(n) = aT(n/b) + f(n)$$
Где $a \geq 1$, $b > 1$, $f(n)$ - асимптотически положительная функция.
```

**Результат отображения:**

$$O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$$

$$T(n) = \begin{cases} 1 & \text{if } n = 1 \ 2T(n/2) + O(n) & \text{if } n > 1 \end{cases}$$

$$T(n) = aT(n/b) + f(n)$$ Где $a \geq 1$, $b > 1$, $f(n)$ - асимптотически положительная функция.

## Лучшие практики для математических формул[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BB%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB)

### Рекомендации по написанию[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D0%B8-%D0%BF%D0%BE-%D0%BD%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D1%8E)

markdown

```
✅ Рекомендуется:

1. **Используйте семантические команды**:
   - Используйте `\sin`, `\cos`, `\log` вместо `sin`, `cos`, `log`
   - Используйте `\mathrm{d}x` для дифференциалов

2. **Сохраняйте разумные интервалы**:
   - Добавляйте соответствующие пробелы вокруг операторов: `\,` (тонкий пробел), `\;` (средний пробел), `\quad` (большой пробел)

3. **Используйте соответствующие скобки**:
   - Автоматический размер: `\left(\right)`, `\left[\right]`, `\left\{\right\}`

4. **Выравнивайте формулы**:
   - Используйте среду `align` для выравнивания знаков равенства
   - Используйте `&` для обозначения точек выравнивания

❌ Избегайте:

1. Не разбивать длинные формулы на строки
2. Пропускать необходимые скобки
3. Непоследовательное использование символов
4. Игнорировать проверки синтаксических ошибок
```

### Исправление распространенных ошибок[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B8%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA)

markdown

```
<!-- ❌ Неправильно -->
$sin(x)$, $log(x)$, $max(a,b)$

<!-- ✅ Правильно -->
$\sin(x)$, $\log(x)$, $\max(a,b)$

<!-- ❌ Неправильно -->
$(\frac{a}{b})$

<!-- ✅ Правильно -->
$\left(\frac{a}{b}\right)$

<!-- ❌ Неправильно -->
$x=1+2+3+...+n$

<!-- ✅ Правильно -->
$x = 1 + 2 + 3 + \cdots + n$
```

### Соображения доступности[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D0%BE%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D0%BE%D1%81%D1%82%D0%B8)

markdown

```
Для улучшения доступности формул:

1. **Добавляйте текстовые описания**:
   $$E = mc^2$$
   > Это уравнение массы-энергии Эйнштейна, означающее, что энергия равна массе, умноженной на квадрат скорости света.

2. **Используйте альтернативный текст**:
   Добавляйте упрощенные объяснения после сложных формул

3. **Избегайте использования только цвета для различения**:
   Используйте разные символы или стили для различения концепций

4. **Сохраняйте формулы краткими**:
   Разбивайте сложные формулы на несколько шагов
```

## Поддерживаемые математические среды[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D0%B5-%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D1%80%D0%B5%D0%B4%D1%8B)

### Поддержка Markdown процессоров[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0-markdown-%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D1%80%D0%BE%D0%B2)

|Процессор|Поддержка математики|Синтаксис|Конфигурация|
|---|---|---|---|
|**GitHub**|✅|`$...$`, `$$...$$`|Автоматически|
|**GitLab**|✅|`$...$`, `$$...$$`|Требует включения|
|**VitePress**|✅|`$...$`, `$$...$$`|Конфигурация плагина|
|**Jekyll**|✅|`$...$`, `$$...$$`|MathJax/KaTeX|
|**Hugo**|✅|`$...$`, `$$...$$`|Поддержка темы|

### Пример конфигурации VitePress[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8-vitepress)

javascript

```
// .vitepress/config.js
export default {
  markdown: {
    math: true
  }
}
```

### Движки рендеринга[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B4%D0%B2%D0%B8%D0%B6%D0%BA%D0%B8-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0)

markdown

```
Распространенные движки рендеринга математических формул:

1. **MathJax**:
   - Наиболее полный, поддерживает полный LaTeX
   - Высокое качество рендеринга, но медленная загрузка

2. **KaTeX**:
   - Быстрый рендеринг
   - Поддерживает общий математический синтаксис
   - Меньший размер

3. **MathML**:
   - Нативная поддержка браузера
   - Сложный синтаксис, обычно автоматически генерируется
```

## Связанный синтаксис[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D0%B2%D1%8F%D0%B7%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8-%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%81)

- [Встраивание HTML](https://www.markdownlang.com/ru/advanced/html.html) - Расширения HTML
- [Диаграммы](https://www.markdownlang.com/ru/advanced/diagrams.html) - Рисование диаграмм
- [Лучшие практики](https://www.markdownlang.com/ru/advanced/best-practices.html) - Рекомендации по написанию

## Инструменты и ресурсы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D0%B8-%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D1%8B)

### Онлайн-редакторы[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%BE%D0%BD%D0%BB%D0%B0%D0%B8%D0%BD-%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80%D1%8B)

- **LaTeX Live**: Предварительный просмотр формул LaTeX в реальном времени
- **MathJax Demo**: Тестирование рендеринга MathJax
- **KaTeX Demo**: Тестирование формул KaTeX
- **Desmos**: Графические математические выражения

### Инструменты редактирования формул[​](https://www.markdownlang.com/ru/advanced/math.html#%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB)

- **MathType**: Профессиональный редактор математических формул
- **LaTeX Workshop** (VS Code): Плагин для написания LaTeX
- **MathQuill**: Визуальный математический редактор
- **Wiris**: Онлайн-редактор математических формул

### Справочные ресурсы[​](https://www.markdownlang.com/ru/advanced/math.html#%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D1%8B%D0%B5-%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D1%8B)

- **LaTeX Math Symbols**: Таблица ссылок на математические символы
- **Detexify**: Распознавание рукописных символов LaTeX
- **MathJax Documentation**: Официальная документация
- **KaTeX Supported Functions**: Список поддерживаемых функций

Освоив синтаксис математических формул, вы сможете элегантно выражать сложные математические концепции и формулы в технической документации.