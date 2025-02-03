
# Лекция 4. Массивы

Массивы - структура данных, которая содержит фиксированное количество значений одного типа или его подтипов. Самый распространённый тип массивов в Котлин - массивы объектного типа, представленные классом `Array`.

## Когда их использовать
Используйте массивы в Котлин, когда у вас есть специальные низкоуровневые требования. Например, если у вас есть требования к производительности в большей степени, чем требуется для стандартных приложений, или вам нужно создать уникальные структуры данных. Если у вас нет подобных ограничений - используйте коллекции.

## Преимущества коллекций над массивами
1. Коллекции могут быть неизменяемыми. Это даёт вам больше контроля и позволяет писать более надёжный код.
2. Добавлять и удалять элементы коллекции - легко. Для сравнения, массивы имеют фиксированный размер. Единственный способ добавить или удалить элементы из массива - создавать новый массив каждый раз, что очень неэффективно.

```kotlin
var riversArray = arrayOf("Nile", "Amazon", "Yangtze")
// Использование операции += создаёт новый массив riversArray,
// копирует оригинальные элементы и добавляет "Mississippi"
riversArray += "Mississippi"
println(riversArray.joinToString())
// Nile, Amazon, Yangtze, Mississippi
```

Для сравнения коллекций используется единственный оператор `===`, для сравнения массивов нужна специальная функция.

## Создание массивов
Можно создать:
1. `arrayOf`
2. `arrayOfNulls`
3. `emptyArray`
4. Конструктором `Array`

### `arrayOf()`
```kotlin
// Создаёт массив со значениями [1, 2, 3]
val simpleArray = arrayOf(1, 2, 3)
println(simpleArray.joinToString())
// 1, 2, 3
```

### `arrayOfNulls()`
Создаёт массив заданной длины, состоящий из `null`.
```kotlin
// Создаёт массив со значениями [null, null, null]
val nullArray: Array<Int?> = arrayOfNulls(3)
println(nullArray.joinToString())
// null, null, null
```

### `emptyArray()`
Создаёт пустой массив. Массивы можно типизировать, указав тип после вызова метода.
```kotlin
var exampleArray = emptyArray<String>()
var exampleArray: Array<String> = emptyArray()
```

### Конструктор `Array`
Принимает значение размера массива и функцию, которая возвращает значения.
```kotlin
// Создаёт Array<Int>, инициализированный нулями [0, 0, 0]
val initArray = Array<Int>(3) { 0 }
println(initArray.joinToString())
// 0, 0, 0

// Создаёт Array<String> со значениями ["0", "1", "4", "9", "16"]
val asc = Array(5) { i -> (i * i).toString() }
asc.forEach { print(it) }
// 014916
```

## Вложенные массивы
Массивы могут быть вложены друг в друга.
```kotlin
// Создаёт двумерный массив
val twoDArray = Array(2) { Array<Int>(2) { 0 } }
println(twoDArray.contentDeepToString())
// [[0, 0], [0, 0]]

// Создаёт трёхмерный массив
val threeDArray = Array(3) { Array(3) { Array<Int>(3) { 0 } } }
println(threeDArray.contentDeepToString())
// [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
```

## Обращение и изменение элементов
Массивы всегда мутабельны. Доступ к элементам осуществляется по индексам.
```kotlin
val simpleArray = arrayOf(1, 2, 3)
val twoDArray = Array(2) { Array<Int>(2) { 0 } }

// Доступ к элементу и его изменение
simpleArray[0] = 10
twoDArray[0][0] = 2

// Вывод изменённого элемента
println(simpleArray[0].toString()) // 10
println(twoDArray[0][0].toString()) // 2
```

## Работа с массивами
В Котлин вы можете передать переменное количество аргументов в функцию, используя параметр `vararg`. Для передачи массива как аргумент используется оператор `*` (spread).
```kotlin
fun main() {
    val lettersArray = arrayOf("c", "d")
    printAllStrings("a", "b", *lettersArray)
    // abcd
}

fun printAllStrings(vararg strings: String) {
    for (string in strings) {
        print(string)
    }
}
```

## Сравнение массивов
Для сравнения, имеют ли массивы одинаковые элементы в одинаковом порядке, используются методы:
1. `.contentEquals()`
2. `.contentDeepEquals()`

```kotlin
val simpleArray = arrayOf(1, 2, 3)
val anotherArray = arrayOf(1, 2, 3)

// Сравнение содержимого массивов
println(simpleArray.contentEquals(anotherArray))
// true

// Использование инфиксной нотации, сравнение содержимого массивов после изменения элемента
simpleArray[0] = 10
println(simpleArray contentEquals anotherArray)
// false
```

Не используйте операторы `==` и `!=` для сравнения наполнения массивов. Данные операторы проверяют, ссылаются ли переменные на один и тот же объект в памяти.

## Преобразование массивов
В Котлин есть множество полезных функций для преобразования массивов. Например:

### Сумма
```kotlin
val sumArray = arrayOf(1, 2, 3)
// Суммирует элементы массива
println(sumArray.sum())
// 6
```

### Перемешивание
Для случайного перемешивания элементов массива используется функция `.shuffle()`.
```kotlin
val simpleArray = arrayOf(1, 2, 3)
// Перемешивает элементы [3, 2, 1]
simpleArray.shuffle()
println(simpleArray.joinToString())

// Перемешивает элементы снова [2, 3, 1]
simpleArray.shuffle()
println(simpleArray.joinToString())
```

### Конвертация массивов в коллекции
Вы можете конвертировать массивы в коллекции, такие как `List` или `Set`, используя функции `.toList()` и `.toSet()`.
```kotlin
val simpleArray = arrayOf("a", "b", "c", "c")
// Конвертирует в Set
println(simpleArray.toSet())
// [a, b, c]

// Конвертирует в List
println(simpleArray.toList())
// [a, b, c, c]
```

### В `Map`
Для конвертации массива в `Map`, необходимо чтобы массив имел map-подобную структуру.
```kotlin
val pairArray = arrayOf("apple" to 120, "banana" to 150, "cherry" to 90, "apple" to 140)
// Конвертирует в Map
// Ключи - фрукты, значения - их калорийность
// Обратите внимание, что ключи должны быть уникальными, поэтому последнее значение "apple" перезаписывает первое
println(pairArray.toMap())
// {apple=140, banana=150, cherry=90}
```

## Примитивные типы
| Primitive-type array | Equivalent in Java |
|----------------------|--------------------|
| `BooleanArray`       | `boolean[]`        |
| `ByteArray`          | `byte[]`           |
| `CharArray`          | `char[]`           |
| `DoubleArray`        | `double[]`         |
| `FloatArray`         | `float[]`          |
| `IntArray`           | `int[]`            |
| `LongArray`          | `long[]`           |
| `ShortArray`         | `short[]`          |

```kotlin
// Создаёт массив Int размером 5, инициализированный нулями
val exampleArray = IntArray(5)
println(exampleArray.joinToString())
// 0, 0, 0, 0, 0
```


