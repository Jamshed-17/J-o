
## Backend

Сначала нужно создать образ контейнера

```bash
docker build -t NAME_OF_IMAGE .
```

Затем запустить этот образ (создать контейнер)

```bash
docker run -d --name NAME_OF_CONTAINER -p 80:80 NAME OF IMAGE
```


Чтобы всё работало корректно `Dockerfile` должен выглядеть примерно так:

```dockerfile
FROM python:3.12

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

```


## Frontend

Запись `Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Создаём образ контейнера:

```bash
docker build -t my-react-app-dev .
```

Запускаем контейнер:

```bash
docker run -d --name Frontend_todo_container 3000:3000 my-react-app-dev:dev npm install --save-dev webpack
```
