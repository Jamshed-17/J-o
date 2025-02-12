
Установите необходимые компоненты:

Git:
```bash
sudo apt install git
```

Git установлен

Docker:
1. Загрузить скрипт с запуском докера
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
```
2. Запустить скрипт
```bash
sudo chmod +x get-docker.sh
```
1. Сделать скрипт исполняемым
```bash
sudo sh ./get-docker.sh
```

После этих процедур можно приступить к запуску приложения. 

Скопируйте репозиторий с GitHub:
```bash
git clone https://github.com/Jamshed-17/To-Do_train.git
```

Перейдите в появившуюся папку:
```bash
cd To-Do_train
```

Теперь запустите контейнеры для серверной и клиентской части приложения. Для этого:

Перейдите в директорию `Backend`:
```bash
cd Backend
```

Сначала нужно создать образ контейнера
```bash
docker build -t to-do-image .
```

Затем запустить этот образ (создать контейнер)
```bash
docker run -d --name to-do-container -p 80:80 to-do-image
```

После этого нужно перейти в директорию Frontend:
```bash
cd ../Frontend/
```

Теперь нужно запустить контейнер клиента:

Создаём образ контейнера:
```bash
docker build -t my-react-app-dev  .
```

Запускаем контейнер:
```bash
docker run -d -p 3000:3000 my-react-app-dev
```

Готово! Переходите по ссылке http://193.107.238.171:3000/ и пользуйтесь этой штукой сколько захотите!