### 1. Преимущества хранимых процедур

- **Производительность:** Процедуры компилируются один раз и хранятся на сервере в виде исполняемого кода.
    
- **Снижение трафика:** Вместо передачи длинных SQL-запросов клиент отправляет только имя процедуры и параметры.
    
- **Безопасность:** Можно дать пользователю права на запуск процедуры, не давая прямого доступа к таблицам.
    
- **Централизация логики:** Изменения в коде вносятся на сервере, а не в каждом клиентском приложении.
    

### 2. Преимущества триггеров

- **Автоматизация:** Срабатывают автоматически при событиях DML (INSERT, UPDATE, DELETE).
    
- **Целостность данных:** Позволяют реализовать сложные проверки, которые невозможно описать через CHECK.
    
- **Аудит:** Удобны для ведения логов изменений (кто, когда и что изменил).
    
- **Синхронизация:** Автоматическое обновление связанных данных в других таблицах.
    

### 3. Объявление локальной переменной

В теле модуля (процедуры или триггера) переменные объявляются с помощью ключевого слова `DECLARE VARIABLE` перед основным блоком `BEGIN ... END`.

SQL

```
DECLARE VARIABLE MY_VAR INTEGER;
DECLARE VARIABLE TOTAL_PRICE NUMERIC(15, 2) = 0; -- С инициализацией
```

### 4. Условные операторы в PSQL

1. **IF...THEN...ELSE:**
    
    SQL
    
    ```
    IF (условие) THEN 
        /* действия */
    ELSE 
        /* действия */
    ```
    
2. **CASE:** Используется для выбора одного из нескольких значений.
    
3. **WHILE:** Цикл с предпроверкой условия.
    

### 5. Курсоры: явные и неявные

**Курсор** — это указатель на набор строк, возвращаемый запросом.

- **Неявный курсор:** Создается автоматически для одиночных запросов `SELECT ... INTO`. Если запрос вернет более одной строки, возникнет ошибка.
    
- **Явный курсор:** Объявляется пользователем (`DECLARE CURSOR`). Позволяет последовательно перебирать строки результата запроса с помощью команд `OPEN`, `FETCH` и `CLOSE`.
    

### 6. Использование RETURNING в PSQL

Чтобы запомнить значения столбцов сразу после вставки или изменения, используется конструкция `RETURNING ... INTO`:

SQL

```
INSERT INTO USERS (NAME) VALUES ('Admin') 
RETURNING ID INTO :NEW_ID;
```

### 7. Генератор последовательности (Sequence)

Это объект, генерирующий уникальные числа (обычно для первичных ключей).

- **Создание:** `CREATE SEQUENCE SEQ_NAME;`
    
- **Использование:** `NEXT VALUE FOR SEQ_NAME`
    
- **Удаление:** `DROP SEQUENCE SEQ_NAME;`
    

### 8. Исключения (Exceptions)

Механизм обработки ошибок.

- **Создание:** `CREATE EXCEPTION ERR_MSG 'Текст ошибки';`
    
- **Изменение:** `ALTER EXCEPTION ERR_MSG 'Новый текст';`
    
- **Вызов:** `EXCEPTION ERR_MSG;`
    
- **Перехват:** Блок `WHEN ANY DO` или `WHEN EXCEPTION ... DO` в конце модуля.
    

### 9. Динамическое выполнение запросов

Осуществляется с помощью оператора **`EXECUTE STATEMENT`**.

- **Формы:**
    
    1. Простое выполнение: `EXECUTE STATEMENT 'DROP TABLE TEMP_DATA';`
        
    2. С возвратом значений: `EXECUTE STATEMENT 'SELECT count(*) FROM ...' INTO :CNT;`
        
    3. С параметрами: использование `USING` для передачи переменных в строку запроса.
        

### 10. SQL-сценарии и создание БД

**SQL-сценарий** — это текстовый файл, содержащий последовательность команд SQL, разделенных терминатором (обычно `;` или `^`).

- **Создание БД:**
    
    SQL
    
    ```
    CREATE DATABASE 'C:\Data\Base.fdb' 
    USER 'SYSDBA' PASSWORD 'masterkey' 
    PAGE_SIZE 8192 DEFAULT CHARACTER SET UTF8;
    ```
    

### 11. DML-триггеры

Триггеры, реагирующие на изменение данных в таблицах.

- **Типы:** `BEFORE` (до операции) или `AFTER` (после).
    
- **События:** `INSERT`, `UPDATE`, `DELETE`.
    
- **Создание:**
    
    SQL
    
    ```
    CREATE TRIGGER TR_BI_TABLE FOR MY_TABLE
    ACTIVE BEFORE INSERT POSITION 0
    AS
    BEGIN
        IF (NEW.ID IS NULL) THEN NEW.ID = NEXT VALUE FOR SEQ_ID;
    END
    ```
    
- **Модификация:** `ALTER TRIGGER` (можно включить/выключить `ACTIVE/INACTIVE`).
    
- **Удаление:** `DROP TRIGGER имя_триггера;`
    

# Лабораторная работа №5

```mysql
-- ==========================================================
-- 1. СОЗДАНИЕ СТРУКТУРЫ УЧЕБНОЙ БД
-- ==========================================================
CREATE DATABASE IF NOT EXISTS LaboratoryWork5;
USE LaboratoryWork5;

-- Таблица улиц
CREATE TABLE Streets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- Таблица абонентов
CREATE TABLE Abonents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fio VARCHAR(100),
    account_number VARCHAR(8),
    street_id INT,
    house_home VARCHAR(10),
    flat_home VARCHAR(10),
    phone VARCHAR(20),
    FOREIGN KEY (street_id) REFERENCES Streets(id)
);

-- Таблица услуг
CREATE TABLE Services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

-- Таблица начислений
CREATE TABLE Accruals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    abonent_id INT,
    service_id INT,
    amount DECIMAL(15, 2),
    date_accrual DATE,
    FOREIGN KEY (abonent_id) REFERENCES Abonents(id),
    FOREIGN KEY (service_id) REFERENCES Services(id)
);

-- Таблица мастеров
CREATE TABLE Masters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- Таблица неисправностей
CREATE TABLE Faults (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- Таблица ремонтных заявок
CREATE TABLE Requests (
    id INT PRIMARY KEY,
    abonent_id INT,
    master_id INT,
    date_in DATE,
    date_out DATE,
    fault_id INT,
    FOREIGN KEY (abonent_id) REFERENCES Abonents(id),
    FOREIGN KEY (master_id) REFERENCES Masters(id),
    FOREIGN KEY (fault_id) REFERENCES Faults(id)
);

-- Таблица фактов оплаты
CREATE TABLE Payments (
    id INT PRIMARY KEY,
    abonent_id INT,
    amount DECIMAL(15, 2),
    pay_date DATE,
    FOREIGN KEY (abonent_id) REFERENCES Abonents(id)
);

-- ==========================================================
-- ЗАПОЛНЕНИЕ ТЕСТОВЫМИ ДАННЫМИ (для корректной работы запросов)
-- ==========================================================
INSERT INTO Streets (name) VALUES ('ул. Ленина'), ('ул. Мира');
INSERT INTO Services (name) VALUES ('Газоснабжение'), ('Водоотведение');
INSERT INTO Masters (name) VALUES ('Петров П.П.');
INSERT INTO Faults (name) VALUES ('Утечка'), ('Засор');

INSERT INTO Abonents (fio, account_number, street_id, house_home, flat_home) 
VALUES ('Мищенко Е. В.', '012345', 1, '10', '5'),
       ('Иванов И.И.', '015527', 1, '12', '44'),
       ('Сидоров С.С.', '999999', 2, '1', '1');

INSERT INTO Accruals (abonent_id, service_id, amount, date_accrual)
VALUES (1, 1, 500.00, '2018-12-15'), 
       (2, 1, 300.00, '2023-05-10');

INSERT INTO Payments (id, abonent_id, amount, pay_date)
VALUES (1, 1, 600.00, '2023-05-20'),
       (2, 2, 400.00, '2023-05-21');

-- ==========================================================
-- ВЫПОЛНЕНИЕ ЛАБОРАТОРНОЙ РАБОТЫ №5
-- ==========================================================

-- 2. Создание таблицы Pattern
CREATE TABLE Pattern (
    Fint INTEGER,
    Fchar30 VARCHAR(30),
    Fchar40 VARCHAR(40),
    Fchar8 VARCHAR(8),
    Fnumeric NUMERIC(18,4),
    Fdate DATE
);

-- 3.1 Информация о средних начислениях по месяцам
INSERT INTO Pattern (Fchar30, Fnumeric)
SELECT 
    DATE_FORMAT(date_accrual, '%m.%Y'), 
    AVG(amount)
FROM Accruals
WHERE YEAR(date_accrual) = 2023
GROUP BY DATE_FORMAT(date_accrual, '%m.%Y');

-- 3.2 Информация об абонентах на выбранной улице
INSERT INTO Pattern (Fchar30, Fchar40)
SELECT 
    a.fio, 
    CONCAT(a.house_home, ' ', a.flat_home)
FROM Abonents a
JOIN Streets s ON a.street_id = s.id
WHERE s.name = 'ул. Ленина';

-- 3.3 Информация о заявках и их абонентах
-- Предположим, для теста сначала добавим одну заявку
INSERT INTO Requests (id, abonent_id, master_id, date_in, fault_id) VALUES (1, 1, 1, '2023-01-01', 1);

INSERT INTO Pattern (Fnumeric, Fdate, Fchar30, Fchar8, Fchar40)
SELECT 
    r.id, r.date_in, a.fio, a.account_number, s.name
FROM Requests r
JOIN Abonents a ON r.abonent_id = a.id
JOIN Streets s ON a.street_id = s.id
WHERE s.name = 'ул. Ленина';

-- 4. Однострочный INSERT новой заявки
INSERT INTO Requests (id, abonent_id, master_id, date_in, fault_id, date_out)
SELECT 
    (SELECT IFNULL(MAX(id), 0) + 1 FROM Requests), 
    (SELECT id FROM Abonents WHERE fio = 'Иванов И.И.' LIMIT 1),
    (SELECT id FROM Masters LIMIT 1),
    DATE_SUB(CURDATE(), INTERVAL 1 MONTH),
    (SELECT id FROM Faults LIMIT 1),
    NULL;

-- 5. Установить дату выполнения для новой заявки
UPDATE Requests 
SET date_out = CURDATE() 
WHERE date_out IS NULL AND abonent_id = (SELECT id FROM Abonents WHERE fio = 'Иванов И.И.' LIMIT 1);

-- 6. Добавить новый факт оплаты
INSERT INTO Payments (id, abonent_id, amount, pay_date)
SELECT 
    (SELECT IFNULL(MAX(id), 0) + 1 FROM Payments),
    (SELECT id FROM Abonents LIMIT 1),
    700.00,
    CURDATE();

-- 7. Изменить дату оплаты на 10-е число след. месяца
UPDATE Payments 
SET pay_date = DATE_ADD(DATE_FORMAT(pay_date, '%Y-%m-10'), INTERVAL 1 MONTH)
WHERE id = (SELECT max_id FROM (SELECT MAX(id) AS max_id FROM Payments) AS t);

-- ==========================================================
-- ВАРИАНТ 1
-- ==========================================================

-- 1. Увеличить на 50 руб. начисления для Мищенко Е. В.
UPDATE Accruals 
SET amount = amount + 50 
WHERE abonent_id = (SELECT id FROM Abonents WHERE fio = 'Мищенко Е. В.');

-- 2. Удалить все факты оплаты с суммой менее 550 руб.
DELETE FROM Payments 
WHERE amount < 550;

-- 3. Изменить номер телефона абонента с л/с 015527
UPDATE Abonents 
SET phone = '8-911-000-00-00' 
WHERE account_number = '015527';

-- 4. Удалить информацию о начислениях по услуге Газоснабжение за декабрь 2018 г.
DELETE FROM Accruals 
WHERE service_id = (SELECT id FROM Services WHERE name = 'Газоснабжение')
  AND date_accrual BETWEEN '2018-12-01' AND '2018-12-31';

-- 5. Для абонентов с минимальной оплатой уменьшить начисления на 10%
UPDATE Accruals 
SET amount = amount * 0.9 
WHERE abonent_id IN (
    SELECT abonent_id FROM (
        SELECT abonent_id FROM Payments WHERE amount = (SELECT MIN(amount) FROM Payments)
    ) AS temp
);

-- Проверка результата
SELECT * FROM Pattern;
SELECT * FROM Accruals;
```