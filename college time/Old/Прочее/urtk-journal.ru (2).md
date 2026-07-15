## Данные для входа в журнал
Логин: EarthDani
пароль: dbcNL0Cu


## Jino 
логин: ailarionov
пароль: GZShchedrova@mephi.ru

## Подключение по ssh
Адрес: urtk-journal.vps.myjino.ru
Логин: root
Пароль: GZShchedrova@mephi.ru
ПАРОЛЬ2: X&Z34G9K<m5]

```bash
ssh root@c4dce0d624c5.vps.myjino.ru
```

## Запуск контейнеров и последовательность действий

1. Остановка nginx
```bash
sudo systemctl stop nginx
```

2. Запуск nginx-container
```bash
docker start nginx-container
```

### Сборка фронтенда
```bash
docker build --network host -t frontend-app .
```

### Запуск frontend приложения
```bash
docker run -d --name frontend-container --network host frontend-app
```

```bash
docker start frontend-container
```

### Остановка и удаление фронтенд-контейнеров
```bash
docker stop frontend-container 
docker rm frontend-container
```

### Сборка бэкенда
```bash
docker build --network host -t backend-app .
```
### Остановка и удаление бэкенд-контейнеров
```bash
docker stop backend-container 
docker rm backend-container
```


### Запуск backend приложения

```bash
docker run -d --name backend-container --network host backend-app
```

```bash
docker start backend-container
```

### Запуск и остановка nginx
```bash
docker stop nginx-container
docker rm nginx-container
```


```bash
docker run -d --name nginx-container --network host \
-v ./nginx.conf:/etc/nginx/nginx.conf nginx:alpine
```

```bash
docker start nginx-container
```

## Вход в mysql-container
```bash
docker exec -it mysql-container mysql -u root -p45330224
```


## Запуск контейнера расписаний
```bash
docker build --network host -t time-table-app .

docker run -d --name time-table-container --network host time-table-app

docker stop time-table-container
docker rm time-table-container
```


## Запуск контейнера бота телеграм для сис админа
```bash
docker build --network host -t admin-bot-app .

docker run -d --name admin-bot-container --network host admin-bot-app

docker stop admin-bot-container
docker rm admin-bot-container
```



PiVPN - для активации удалённого сервака (VPN)
