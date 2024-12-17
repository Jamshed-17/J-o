#БазыДанных #Конспект #ТРиЗБД #SQL 

## Создание базы данных
Для создания базы данных используется `CREATE DATABASE` и у неё следующий синтаксис:

`CREATE DATABASE имя_базы_данных`. "Если таковой нет"
```sql
CREATE DATABASE sql
```

## Удаление базы
`DROP DATABASE название_базы ` - Удаляет базу если такая есть. Если нет возвращает ошибку.
```sql
DROP DATABASE sql
```

## Создание таблицы
`CREATE TEBLE название_таблицы`
(столбец_1 тип данных атрибута, столбец_2 тип данных)...
```sql
CREATE TABLE table_1
(
id INT,
age INT,
FirstName VARCHAR(20)
)
```

## Переименование таблиц
`ALTER TABLE` и `RENAME TO`
```sql
ALTER TABLE table_1
RENAME TO TABLICA;
```

## Полное удаление данных
`DELETE FROM`
```sql
DELETE FROM TABLICA
```
$ Удаляет данные, но оставляет структуру

## Удаление таблицы
`DROP TABLE`
```sql
DROP TABLE TABLICA;
```

## Атрибуты столбцов и таблиц
С их помощью можно настроить поведение таблиц
- PRIMARY KEY
	Задаёт первичный ключ таблицы * в самом начале
	`id INT PRIMARY KEY`
- AUTOINCREMENT
	Увеличивает число автоматически
	`id INTEGER PRIMARY KEY AUTOINCREMENT`
- UNIQUE
	Только уникальные значения
	`phone VARCHAR(13) UNIQUE`
- NULL и NOT NULL * в самом конце
	Определяет может ли ячейка быть пустой. Не даст сохранить изменения, если аргумент не выполняется.
	`FirstName VARCHAR(20) NOT NULL`
- DEFAULT
	Определяет значение по умолчанию.
	`age INT DEFAULT 18`
- CHEK
- Оператор  CONSTRAINT. Установки имени ограничения

