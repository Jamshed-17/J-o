#python #Конспект #ОАиП #Программирование #ФункцииPython #web #fastAPI 

**Pydantic 2** — это библиотека для Python, предназначенная для **валидации и трансформации данных**. Она помогает разработчикам гарантировать, что входные данные соответствуют установленным правилам и типам, а также обеспечивает их автоматическое преобразование в нужные форматы.

### Основные функции Pydantic:

- **Валидация данных:** проверка входных данных на соответствие ожидаемым типам и ограничениям.
    
- **Трансформация данных:** автоматическое приведение данных к нужным типам и форматам.

Модели в Pydantic наследуются от класса `BaseModel`. Каждая модель описывает набор полей, которые представляют собой структуру данных и условия для их валидации.

### Описание полей:

- **Типизация:** Поля в модели описываются с указанием типов, например, `name: str`. Это обеспечивает базовую типовую валидацию.
    
- **Использование** `Field()`: Позволяет аннотировать поля с дополнительными параметрами, такими как значения по умолчанию, ограничения и другие настройки.

**Пример базовой модели:**

```python
from pydantic import BaseModel, Fieldclass User(BaseModel):    name: str    email: str = Field(..., alias='email_address')
```

#### Валидация полей

1. **Минимальная валидация типов:** Используя встроенные типы Python (например, `str`, `int`), можно проводить базовую проверку полей.
    
2. **Использование валидаторов:** В Pydantic доступны валидаторы, такие как `EmailStr` для проверки email-адресов. Для использования расширенных валидаторов требуется установка дополнительных зависимостей: `pydantic[email]` или `pydantic[all]`.
    

**Пример с валидатором:**

```python
from pydantic import BaseModel, EmailStr

	class User(BaseModel):
	    name: str    
	    email: EmailStr
```

>[!ORM]
>ORM (англ. Object-Relational Mapping, рус. объектно-реляционное отображение, или преобразование) — технология программирования, которая связывает базы данных с концепциями объектно-ориентированных языков программирования, создавая «виртуальную объектную базу данных». 


`Pydantic` способен работать с ORM (реляционными базами данных)

Чтобы настроить модель для работы с ORM, используйте параметр `ConfigDict` с флагом `from_attributes=True`.

**Пример:**
```python
from datetime import datefrom pydantic import BaseModel, ConfigDictclass User(BaseModel):    id: int    name: str = 'John Doe'    birthday_date: date    config = ConfigDict(from_attributes=True)
```
- Для создания модели Pydantic из объекта ORM используется метод `from_orm`.

`user = User.from_orm(orm_instance)`

#### Методы для работы с данными

- `dict()` / `model_dump()` — преобразуют модель в словарь Python. В версии 2 метод `model_dump()` стал аналогом `dict()`.

**Пример:**

```python
data = user.model_dump()
```

- `json()` / `model_dump_json()` — преобразуют модель в JSON-строку. В новой версии метод `model_dump_json()` заменяет старый `json()`.

**Пример:**

```python
json_data = user.model_dump_json()
```

#### Передача данных в модель

1. **Именованные аргументы:** Поля модели могут задаваться напрямую при создании экземпляра.

**Пример:**

```python
user = User(name="Oleg", age=30)
```

2. **Распакованные словари:** Можно передать значения полей с помощью распаковки словарей `**`.

**Пример:**

```python
user_data = {"name": "Oleg", "age": 30} user = User(**user_data)
```


# Практика

```python
from pydantic import BaseModel
from datetime import date

class User(BaseModel):
    id: int
    name: str
    birthday_date: date
    
```

Здесь мы создали три обязательных поля: `id`, `name`, `birthday_date`. Эти поля будут валидироваться автоматически.

Создадим объект класса:
```python
oleg = User(id=1, name="Oleg", birthday_date=date(year=1992, month=2, day=19))
```

Теперь переведём этот экземпляр в `json` и `dict`:
```python
to_dict = oleg.model_dump()
to_json = oleg.model_dump_json()

print(to_dict, type(to_dict))
print(to_json, type(to_json))
```

В результате получим следующее:
```
{'id': 1, 'name': 'Oleg', 'birthday_date': datetime.date(1992, 2, 19)} <class 'dict'>
{"id":1,"name":"Oleg","birthday_date":"1992-02-19"} <class 'str'>
```

А если мы создадим другой экземпляр и передадим данные другим образом?

```python
alex = User(id=2, name="Алексей", birthday_date="1992-11-22")
```

Выведем точно так же:
```python
to_dict = alex.model_dump()
to_json = alex.model_dump_json()

print(to_dict, type(to_dict))
print(to_json, type(to_json))
```

Получим следующее:
```
{'id': 2, 'name': 'Алексей', 'birthday_date': datetime.date(1992, 11, 22)} <class 'dict'>
{"id":2,"name":"Алексей","birthday_date":"1992-11-22"} <class 'str'>
```

==Pydantic самостоятельно преобразует данные в нужный формат==

### `field_validator`

Это декоратор, который служит для проверки корректности заполнения полей.

Создадим модель `User` добавив валидатор поля `name`

```python
class User(BaseModel):
    id: int
    name: str
    birthday_date: date

    @field_validator('name', mode='before')
    def validate_name(cls, v):
        return str(v)
```

Декоратор field_validator всегда принимает один обязательный аргумент - название поля, которое необходимо валидировать. Второй аргумент, который предпочтительно указывать, mode.

Здесь важно отметить использование параметра `mode='before'`. Это указывает Pydantic на необходимость выполнения валидации и преобразования данных **до** создания экземпляра модели, а не после. Другой вариант - `mode='after'.`

Сам метод принимает само поле (v) и далее начинает его валидировать.

Проверим модель:
```python
user_data = {'id': 3, 'name': '156', 'birthday_date': '1990-11-22'}
user = User(**user_data)
print(user.dict())
```

Вывод:
```python 
{'id': 3, 'name': '156', 'birthday_date': datetime.date(1990, 11, 22)}
```

Неожиданный результат

Допустим, мы передадим такие данные:

```python
dima = User(
    id="3",
    name=("Коля", True, False, 0, 19933),
    birthday_date="1990-11-22"
)
```

Результат:

```python
{'id': 3, 'name': "('Коля', True, False, 0, 19933)", 'birthday_date': datetime.date(1990, 11, 22)}
```

Ошибки нет, но явно что-то не так — вместо строки в поле name мы получили кортеж, который был просто преобразован в строку. Очевидно, что такая ситуация недопустима.

Чтобы этого избежать можно сделать вот так:

```python 
@field_validator('name', mode='before')
def validate_name(cls, v):
    if isinstance(v, int):
        return str(v)
    elif isinstance(v, str):
        return v
    else:
        raise ValueError("Имя должно быть строкой или числом")
        
```

