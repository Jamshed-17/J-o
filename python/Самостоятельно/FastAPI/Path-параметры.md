#python #Конспект #ОАиП #Программирование #ФункцииPython #web #fastAPI

Можно определить путь (параметры или переменные пути) используя строки:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}
```

Значение `item_id` будет передано в функцию как аргумент.

Можно заранее определить тип данных для функции:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
	return {"item_id": item_id}
```

Если передать в такую функцию передать не правильный тип данных - выведется ошибка:

```json
{
    "detail": [
        {
            "loc": [
                "path",
                "item_id"
            ],
            "msg": "value is not a valid integer",
            "type": "type_error.integer"
        }
    ]
}
```

В документации (об этом написано в заметке [[Первые шаги]]) можно увидеть, какой тип данных ожидается.

> [!Pydantic]
>
> Вся проверка данных выполняется под капотом с помощью [Pydantic](https://docs.pydantic.dev/). Поэтому вы можете быть уверены в качестве обработки данных.
> 
> Вы можете использовать в аннотациях как простые типы данных, вроде `str`, `float`, `bool`, так и более сложные типы.

#### Порядок имеет значение[¶](https://fastapi.tiangolo.com/ru/tutorial/path-params/#_6 "Permanent link")

При создании _операций пути_ можно столкнуться с ситуацией, когда путь является фиксированным.

Например, `/users/me`. Предположим, что это путь для получения данных о текущем пользователе.

У вас также может быть путь `/users/{user_id}`, чтобы получить данные о конкретном пользователе по его ID.

Поскольку _операции пути_ выполняются в порядке их объявления, необходимо, чтобы путь для `/users/me` был объявлен раньше, чем путь для `/users/{user_id}`:

[Python 3.8+](https://fastapi.tiangolo.com/ru/tutorial/path-params/#__tabbed_3_1)

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}


@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}
```

Иначе путь для `/users/{user_id}` также будет соответствовать `/users/me`, "подразумевая", что он получает параметр `user_id` со значением `"me"`.

#### Предопределенные значения

Что если нам нужно заранее определить допустимые _параметры пути_, которые _операция пути_ может принимать? В таком случае можно использовать стандартное перечисление `Enum` Python.

##### Создание класса `Enum`[¶](https://fastapi.tiangolo.com/ru/tutorial/path-params/#enum "Permanent link")

Импортируйте `Enum` и создайте подкласс, который наследуется от `str` и `Enum`.

Мы наследуемся от `str`, чтобы документация API могла понять, что значения должны быть типа `string` и отображалась правильно.

Затем создайте атрибуты класса с фиксированными допустимыми значениями:


```python
from enum import Enum

from fastapi import FastAPI


class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"


app = FastAPI()


@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}

    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}

    return {"model_name": model_name, "message": "Have some residuals"}
```

Про `Enum` - 