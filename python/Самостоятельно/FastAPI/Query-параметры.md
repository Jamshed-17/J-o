#python #Конспект #ОАиП #Программирование #ФункцииPython #web #fastAPI 

Когда в функцию передаются параметры 
`async def read_item(skip: int = 0, limit: int = 10):`, которых нет в параметрах пути `@app.get("/items/")` - они автоматически интерпретируются как `query`-параметры

```python
from fastapi import FastAPI

app = FastAPI()

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]
```

Query-параметры представляют из себя набор пар ключ-значение, которые идут после знака `?` в URL-адресе, разделенные символами `&`.

Например, в этом URL-адресе:

```
http://127.0.0.1:8000/items/?skip=0&limit=10
```
...параметры запроса такие:

- `skip`: со значением `0`
- `limit`: со значением `10`


Можно устанавливать значения по умолчанию, и тогда в ссылке будут отображаться именно они.

Если параметр не обязателен - можно использовать к нему значение `None` - `async def read_item(item_id: str, q: str | None = None):`

Вы также можете объявлять параметры с типом `bool`, которые будут преобразованы соответственно:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str | None = None, short: bool = False):
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```


В этом случае, если вы сделаете запрос:

```
http://127.0.0.1:8000/items/foo?short=1
```

или

```
http://127.0.0.1:8000/items/foo?short=True
```

или

```
http://127.0.0.1:8000/items/foo?short=true
```

или

```
http://127.0.0.1:8000/items/foo?short=on
```

или

```
http://127.0.0.1:8000/items/foo?short=yes
```

или в любом другом варианте написания (в верхнем регистре, с заглавной буквой, и т.п), внутри вашей функции параметр `short` будет иметь значение `True` типа данных `bool` . В противном случае - `False`.


Параметры Paht и Query можно смешивать.

В query параметрах можно использовать класс Enum -> [[Enum]]

