#python #Конспект #ОАиП #Программирование #ФункцииPython #web #fastAPI


`Enum` - это перечисления. Это удобный инструмент для работы с группами именованных констант. Может принимать разные типы данных (не только `int`)

Они часто используются для кодов ответов, математических операций, дней недели и т.д.


> [!Не путать]
> Прежде всего, важно не путать эти два понятия, которые имеют одинаковые названия enum:
> 
>  **Перечисления enum**. Это тип данных, который позволяет создать именованный набор констант. Они могут быть реализованы в разных языках программирования, не только в Python.
>  **Модуль enum в Python**. Это стандартный модуль, который предоставляет инструменты для создания перечислений в Python. С его помощью можно легко определить классы перечислений и работать с ними.


### И так, про модуль

Основные компоненты модуля включают в себя:

- **Enum**. Базовый класс для создания перечислений. Он позволяет определить набор именованных констант с уникальными значениями.
- **IntEnum**. Расширяет функционал Enum, причем все элементы перечисления являются подклассами типа int.
- **Flag**. Перечисление, предназначенное для создания набора битовых флагов. Элементы такого перечисления можно комбинировать с помощью побитовых операторов.
- **IntFlag**. Комбинирует функционал IntEnum и Flag, позволяя создавать перечисления битовых флагов, где каждое значение является числом.

Дополнительные инструменты:

- **Декоратор unique**. Гарантирует, что все значения в перечислении уникальны. Если два элемента имеют одно и то же значение, тогда будет вызвано исключение.
- **Помощник auto**. Позволяет автоматически присваивать значения элементам перечисления. При его использовании значения начинаются с единицы и увеличиваются на единицу для каждого следующего элемента.
## Создание перечислений в python

Для создания перечисления в python нужно создать класс, который будет наследован от `enum.Enum`
Пример:

```python
import enum

class BugStatus(enum.Enum):

    new = 7
    incomplete = 6
    invalid = 5
    wont_fix = 4
    in_progress = 3
    fix_committed = 2
    fix_released = 1

print(f"\nMember name: {BugStatus.wont_fix.name}")

print(f"Member value: {BugStatus.wont_fix.value}")
```


При запуске будет следующее:
```bash
Member name: wont_fix
Member value: 4
```

Каждый атрибут в Enum автоматически становится экземпляром перечисления при определении класса. Эти экземпляры имеют два основных атрибута:

- **name**, который содержит имя элемента;
- **value**, который содержит его значение.


#### Итерирование по перечислениям в Python

В Python итерирование по элементам перечисления выполняется очень просто. В следующем примере мы создаем **перечисление Weapon** с использованием функции Enum, где константы передаются в виде строки с пробелами между элементами.

```python
from enum import Enum
    Weapon = Enum('Weapon', 'SWORD BOW DAGGER CLUB', start=10)

    for weapon in Weapon:
        print(weapon)

    for weapon in Weapon:
        print(weapon.name, weapon.value)
```

В этом коде на первом цикле мы выводим элементы
Во втором тоже самое, но в виде ключ значение

```shell
Weapon.SWORD
Weapon.BOW
Weapon.DAGGER
Weapon.CLUB
SWORD 10
BOW 11
DAGGER 12
CLUB 13
```

#### Сравнение элементов

```python
import enum

class BugStatus(enum.Enum):

    new = 7
    incomplete = 6
    invalid = 5
    wont_fix = 4
    in_progress = 3
    fix_committed = 2
    fix_released = 1

actual_state = BugStatus.wont_fix
desired_state = BugStatus.fix_released

print('Equality:',
      actual_state == desired_state,
      actual_state == BugStatus.wont_fix)  # проверка на равенство
print('Identity:',
      actual_state is desired_state,
      actual_state is BugStatus.wont_fix)  # проверка на то, это один и тот же элемент или нет
print('Ordered by value:')
try:
    print('\n'.join('  ' + s.name for s in sorted(BugStatus)))  # пытаемся упорядочить
except TypeError as err:
    print('  Cannot sort: {}'.format(err))  # вывод ошибки в случае неудачи
```

В этом коде мы сравниваем два элемента перечисления на равенство и идентичность. Последний блок кода демонстрирует попытку упорядочить элементы перечисления по их значениям, что приведет к ошибке, так как элементы Enum не имеют встроенного порядка сортировки.


### Использование IntEnum для создания упорядоченных перечислений

```python
import enum

class BugStatus(enum.IntEnum):

    new = 7
    incomplete = 6
    invalid = 5
    wont_fix = 4
    in_progress = 3
    fix_committed = 2
    fix_released = 1

print('Ordered by value:')
print('\n'.join('  ' + s.name for s in sorted(BugStatus)))  # упорядочивание по значению
```

Вывод:
```bash
Ordered by value:
  fix_released
  fix_committed
  in_progress
  wont_fix
  invalid
  incomplete
  new
```

Как видите, благодаря IntEnum мы можем легко упорядочить элементы перечисления по их значениям, что было бы невозможно с обычным Enum.


### Обеспечение уникальности значений в перечислениях Python

В Python элементы перечисления могут иметь одинаковые значения. Если это происходит, последующие элементы с тем же значением считаются синонимами первого элемента с этим значением.

```python
import enum

class BugStatus(enum.Enum):

    new = 7
    incomplete = 6
    invalid = 5
    wont_fix = 4
    in_progress = 3
    fix_committed = 2
    fix_released = 1

    by_design = 4
    closed = 1

for status in BugStatus:
	print(f"{status.name:14} = {status.value}")

print('\nSame: by_design is wont_fix: ',
      BugStatus.by_design is BugStatus.wont_fix)
print('Same: closed is fix_released: ',
      BugStatus.closed is BugStatus.fix_released)
```

Если вы хотите гарантировать уникальность значений для всех элементов перечисления, используйте декоратор `@enum.unique*`:

```python
import enum

@enum.unique
class BugStatus(enum.Enum):
    new = 7
    incomplete = 6
    invalid = 5
    wont_fix = 4
    in_progress = 3
    fix_committed = 2
    fix_released = 1

    # This will trigger an error with unique applied.
    by_design = 4
    closed = 1
```

