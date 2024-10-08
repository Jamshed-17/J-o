#python #Конспект #Программирование #web #django #linux 

У нас есть файл **views.py**, который содержит функци-представления, а ещё есь **urls.py**, которые эти функции сопоставляют с адресами с помощью функции **path()**. 

Подробнее о path. За сопоставление путей и функций-представлений отвечает функция path(), которая располагается в пакете django.urls и которая принимает четыре параметра:

```python
path(route, view, kwargs=None, name=None)
```

- **route**: представляет шаблон адреса URL, которому должен соответствовать запрос
    
- **view**: функция-представление, которая обрабатывает запрос
    
- **kwargs**: дополнительные аргументы, которые передаются в функцию-представление
    
- **name**: название маршрута

Однако у **path** есть проблема: адрес должен быть в точности как указанный. Например если мы используем адрес **about**, то **about/** уже не будет работать и Django не сможет сопоставить путь с запросом.

Вместо него можем использовать функцию **re_path()** которая имеет такие же параментры.

```python
re_path(route, view, kwargs=None, name=None)
```

С помощью re_path можно задавать адреса с помощью регулярных выражений. Как пример изменим содержания файла **urls.py** на такое:

```python
from django.urls import path, re_path
from 1 import views
 
urlpatterns = [
    path('', views.hw),
    re_path(r'^about', views.about),
    re_path(r'^contact', views.contact),
]
```

Первую оставили такой же, потому что это наш корень приложения. 

Так же нужно соблюдать очерёдность маршрутов: самые конкретные в начале, а более общие вниз:

```python
from django.urls import path, re_path
from hello import views
 
urlpatterns = [
    re_path(r'^about/contact/', views.contact),
    re_path(r'^about', views.about),
    path('', views.index),
]
```

Если поставить /about/ вверх, то по адресу about/cotnacts был бы именно about.

### Основные элементы синтаксиса регуляных выражений

Некоторые базовые элементы регуляных выражений, которые можно использовать для определения адресов URL:

- `^`(начало адреса)
    
- `$`(конец адреса)
    
- `+`(1 и более символов)
    
- `?`(0 или 1 символ)
    
- `{n}`(n символов)
    
- `{n, m}`(от n до m символов)
    
- `.`(любой символ)
    
- `\d+`(одна или несколько цифр)
    
- `\D+`(одна или несколько НЕ цифр)
    
- `\w+`(один или несколько буквенных символов)


### Рассмотрим несколько возможных сопоставлений шаблонов адресов и запросов:

|   |   |
|---|---|
|Адрес|Запрос|
|r'^$'|http://127.0.0.1/ (корень сайта)|
|r'^about'|http://127.0.0.1/about/ или http://127.0.0.1/about/contact|
|r'^about/contact'|http://127.0.0.1/about/contact|
|r'^products/\d+/'|http://127.0.0.1/products/23/ или http://127.0.0.1/products/6459/abc<br><br>Но не соответствует запросу http://127.0.0.1/products/abc/|
|r'^products/\D+/'|http://127.0.0.1/products/abc/ или http://127.0.0.1/products/abc/123<br><br>Не соответствует запросу http://127.0.0.1/products/123/ или http://127.0.0.1/products/123/abc|
|r'^products/phones\|tablets/'|http://127.0.0.1/products/phones/1 или http://127.0.0.1/products/tablets/<br><br>Не соответствует запросу http://127.0.0.1/products/clothes/|
|r'^products/\w+'|http://127.0.0.1/products/abc/ или http://127.0.0.1/products/123/<br><br>Не соответствует запросу http://127.0.0.1/products/abc-123|
|r'^products/[-\w]+/'|http://127.0.0.1/products/abc-123|
|r'^products/[A-Z]{2}/'|http://127.0.0.1/products/RU<br><br>Не соответствует запросам http://127.0.0.1/products/Ru или http://127.0.0.1/products/RUS|

А ещё в Django можно передавать значения в функцию. Это можно сделать с помощью аргмента **kwargs** в path. Пример. Изменим views.py на такой код:
```python
from django.http import HttpResponse
   
def hw(request):
    return HttpResponse("<h2>Hello world!</h2>")
  
def about(request, name, age):
    return HttpResponse(f"""
            <h2>О пользователе</h2>
            <p>Имя: {name}</p>
            <p>Возраст: {age}</p>
    """)
```

Теперь изменим **urls.py**:
```python
from django.urls import path
from 1 import views
  
urlpatterns = [
    path('', views.hw),
    path('about', views.about, kwargs={"name":"Tom", "age": 38}),
]
```

