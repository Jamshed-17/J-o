*Дополненный конспект*  
---

## **1. Введение в корутины**  
Корутины — это механизм для асинхронного и неблокирующего программирования в Kotlin. Они позволяют эффективно выполнять параллельные задачи без создания множества потоков.  

### **Основные преимущества:**  
✅ **Легковесность** — потребляют меньше ресурсов, чем потоки.  
✅ **Гибкость** — могут приостанавливаться и возобновляться в разных потоках.  
✅ **Структурированный параллелизм** — корутины работают в рамках `CoroutineScope`, что упрощает управление их жизненным циклом.  

---

## **2. Запуск корутин**  
### **2.1. `runBlocking`**  
Блокирует текущий поток до завершения всех корутин внутри. Используется для тестирования или верхнего уровня приложения.  

```kotlin
fun main() = runBlocking {  
    launch {  
        delay(1000L)  
        println("World!")  
    }  
    println("Hello")  
}  
```  
**Вывод:**  
```
Hello  
World!  
```  

### **2.2. `launch` vs `async`**  
| **`launch`**                                                 | **`async`**                                 |
| ------------------------------------------------------------ | ------------------------------------------- |
| Запускает корутину без возврата результата.                  | Возвращает `Deferred<T>` (аналог `Future`). |
| Используется для side-эффектов (логирование, обновление UI). | Используется для вычислений с результатом.  |

**Пример `async`:**  
```kotlin
val result = async {  
    delay(1000L)  
    "Data loaded"  
}  
println(result.await()) // "Data loaded"  
```  

---

## **3. Отложенные функции (`suspend`)**  
Функции с модификатором `suspend` могут вызываться только из корутин или других `suspend`-функций.  

### **Пример:**  
```kotlin
suspend fun fetchData(): String {  
    delay(1000L)  
    return "Data"  
}  

fun main() = runBlocking {  
    val data = fetchData()  
    println(data) // "Data"  
}  
```  

---

## **4. Области видимости (`CoroutineScope`)**  
### **4.1. `coroutineScope`**  
Не блокирует поток, но ждёт завершения всех дочерних корутин.  

```kotlin
suspend fun doWork() = coroutineScope {  
    launch { delay(1000L); println("Task 1") }  
    launch { delay(500L); println("Task 2") }  
}  

fun main() = runBlocking {  
    doWork()  
    println("Done")  
}  
```  
**Вывод:**  
```
Task 2  
Task 1  
Done  
```  

### **4.2. Глобальная область (`GlobalScope`)**  
❌ **Не рекомендуется** — корутины живут всё время работы приложения.  
```kotlin
GlobalScope.launch {  
    delay(1000L)  
    println("Global coroutine")  
}  
```  

---

## **5. Управление корутинами (`Job`, `Cancellation`)**  
### **5.1. `Job`**  
Объект `Job` позволяет управлять корутиной:  
- `job.start()` — запуск.  
- `job.cancel()` — отмена.  
- `job.join()` — ожидание завершения.  

**Пример:**  
```kotlin
fun main() = runBlocking {  
    val job = launch {  
        repeat(5) { i ->  
            println("Working $i")  
            delay(500L)  
        }  
    }  
    delay(1500L)  
    job.cancel() // Отмена после 3 итераций  
}  
```  

### **5.2. Обработка отмены**  
Корутины проверяют `isActive` и могут обрабатывать отмену через `try-catch`.  

```kotlin
val job = launch {  
    try {  
        repeat(1000) { i ->  
            if (!isActive) throw CancellationException()  
            println("Working $i")  
            delay(500L)  
        }  
    } finally {  
        println("Cleanup")  
    }  
}  
```  

---

## **6. Диспетчеры (`Dispatchers`)**  
Определяют, на каком потоке выполняется корутина.  

| **Диспетчер**            | **Назначение**                             |
| ------------------------ | ------------------------------------------ |
| `Dispatchers.Default`    | CPU-интенсивные задачи.                    |
| `Dispatchers.IO`         | Работа с сетью/файлами.                    |
| `Dispatchers.Main`       | Обновление UI (Android).                   |
| `Dispatchers.Unconfined` | Не привязан к потоку (используется редко). |

**Пример:**  
```kotlin
launch(Dispatchers.IO) {  
    val data = fetchFromNetwork()  
    withContext(Dispatchers.Main) {  
        updateUI(data)  
    }  
}  
```  

---

## **7. Практическое применение**  
### **7.1. Параллельные запросы**  
```kotlin
suspend fun fetchData() = coroutineScope {  
    val data1 = async { api.getUser() }  
    val data2 = async { api.getPosts() }  
    val (user, posts) = data1.await() to data2.await()  
    println("User: $user, Posts: $posts")  
}  
```  

### **7.2. Таймауты**  
```kotlin
try {  
    withTimeout(3000L) {  
        longRunningTask()  
    }  
} catch (e: TimeoutCancellationException) {  
    println("Too slow!")  
}  
```  

---

## **Заключение**  
✅ **Корутины** — эффективная замена потокам.  
✅ **`suspend`-функции** — основа асинхронного кода.  
✅ **`CoroutineScope`** — управляет жизненным циклом.  
✅ **Диспетчеры** — оптимизируют выполнение под задачи.  

**Используйте корутины для:**  
- Сетевых запросов.  
- Фоновых вычислений.  
- Параллельной обработки данных.  

**Дополнительные материалы:**  
- [Официальная документация](https://kotlinlang.org/docs/coroutines-guide.html)  
- [Kotlin Coroutines на практике](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines)  
