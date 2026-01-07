### Введение
#### Исторический контекст

До 2019 года большинство интерфейсов в Android (и других системах) разрабатывалось с использованием **императивного подхода**:

- Программист последовательно указывает, что и как должно отобразиться на экране.
    
- Интерфейс строится пошагово с сохранением состояний в переменных.
    
- Элементы UI обновляются напрямую через обращение к компонентам по ID.
    

##### Проблемы императивного подхода:

- **Сложность поддержки:** изменения в одном месте могут сломать другое.
    
- **Побочные эффекты:** изменение состояния из разных мест программы может привести к багам.
    
- **Усложнённая отладка:** сложно проследить, где и почему произошло изменение UI.
    

#### Рождение Jetpack Compose

В 2019 году на конференции **Google I/O** был представлен **Jetpack Compose** — декларативный UI-фреймворк.

- Разработка интерфейсов происходит в стиле **декларативного программирования**: описываем, _что_ хотим увидеть, а не _как_ этого достичь.
    

##### Преимущества Compose:

- Явное управление состоянием.
    
- Меньше кода, выше читаемость.
    
- UI и логика пишутся на одном языке (Kotlin).
    
- Лёгкая интеграция с существующим кодом (View-based UI).
    
- Высокая производительность за счёт рекомпозиции и минимизации объектов.
    

---

### 2. Основные понятия Jetpack Compose

#### @Composable

- Это аннотация, которая указывает, что функция отвечает за отображение UI-компонента.
    
- Все визуальные компоненты должны быть оформлены как функции с аннотацией `@Composable`.
    

Пример:

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
```

#### Рекомпозиция

- **Рекомпозиция** — процесс повторного вызова функции с аннотацией `@Composable`, когда изменяется состояние.
    
- Используется для обновления интерфейса при изменениях данных.
    
- Compose сам отслеживает зависимости и вызывает только те функции, которые необходимо обновить.
    

#### remember и mutableStateOf

- `remember { mutableStateOf(...) }` — позволяет отслеживать состояние внутри функции.
    
- Используется для хранения пользовательского ввода, флагов, состояний компонентов и т.д.
    

Пример:

```kotlin
var text by remember { mutableStateOf("") }
```

---

### 3. Разница между XML и Compose

#### Пример на XML (Императивно):

```xml
<LinearLayout ...>
    <TextInputLayout>
        <TextInputEditText />
    </TextInputLayout>
    <Button />
</LinearLayout>
```

#### Пример на Compose (Декларативно):

```kotlin
@Composable
fun LoginScreen() {
    var login by remember { mutableStateOf("") }

    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(
            value = login,
            onValueChange = { login = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )
        Button(
            onClick = { },
            modifier = Modifier.padding(top = 8.dp).fillMaxWidth()
        ) {
            Text("Submit")
        }
    }
}
```

---

### 4. Компоненты Compose

#### Категории компонентов:

1. **Layout** — компоненты, определяющие структуру:
    
    - `Column`, `Row`, `Box`, `ConstraintLayout`, `BoxWithConstraints`
        
2. **Foundation** — базовые UI-компоненты:
    
    - `Text`, `Image`, `Canvas`, `Shape`, `BaseTextField`, `LazyColumn`, `LazyRow`
        
3. **Material Design** — соответствуют рекомендациям Google:
    
    - `Button`, `Card`, `Checkbox`, `AlertDialog`, `RadioButton`, `DropdownMenu`, `FloatingActionButton`, `LinearProgressIndicator`
        

---

### 5. Modifier — ключ к управлению внешним видом

#### Назначение:

- Изменяет внешний вид компонента.
    
- Добавляет поведение: кликабельность, скролл, перетаскивание.
    
- Обработка пользовательского ввода.
    

#### Примеры модификаторов:

- `Modifier.background(Color.Red)` — цвет фона.
    
- `Modifier.padding(16.dp)` — внутренние отступы.
    
- `Modifier.fillMaxWidth()` — занять всю ширину.
    
- `Modifier.height(100.dp)` — задать высоту.
    

#### Пример:

```kotlin
Text(
    text = "Hello, Compose!",
    fontSize = 25.sp,
    textAlign = TextAlign.Center,
    modifier = Modifier
        .background(Color.Green)
        .width(180.dp)
        .height(100.dp)
        .wrapContentHeight()
)
```

#### Правило использования:

- **Общие свойства** → в `Modifier`
    
- **Уникальные свойства элемента** → в параметрах элемента
    

---

### 6. @Preview — предварительный просмотр

- `@Preview` позволяет увидеть внешний вид компонента без запуска приложения.
    
- Ускоряет разработку: можно моментально видеть изменения.
    

Пример:

```kotlin
@Preview
@Composable
fun PreviewGreeting() {
    Greeting("Compose")
}
```

---

### 7. Gradle

- **Gradle** — система сборки Android-приложений.
    
- В проекте важны два файла `build.gradle`:
    
    - **Project-level** — указывает глобальные настройки.
        
    - **Module-level** — содержит зависимости и версии библиотек.
        

#### Пример зависимости Compose:

```groovy
dependencies {
    implementation "androidx.compose.ui:ui:1.0.0"
    implementation "androidx.compose.material:material:1.0.0"
    implementation "androidx.compose.ui:ui-tooling-preview:1.0.0"
}
```

---

### 8. Основные макеты

- `Column`: вертикальное размещение компонентов.
    
- `Row`: горизонтальное размещение.
    
- `Box`: накладывание компонентов друг на друга, поддержка позиционирования.
    

#### Важность макетов:

Без использования макета элементы могут накладываться друг на друга.

Пример ошибки:

```kotlin
@Composable
fun WrongUI() {
    Text("Hello")
    Text("World") // Наложится на первый, если нет Column/Row
}
```

Пример исправления:

```kotlin
@Composable
fun CorrectUI() {
    Column {
        Text("Hello")
        Text("World")
    }
}
```

---

### 9. Заключение

Jetpack Compose — современный, мощный и гибкий инструмент для создания UI на Android. Он значительно упрощает написание интерфейсов благодаря декларативному подходу, обеспечивает высокую производительность и отличную совместимость с текущими системами. Освоение Compose — важный шаг в развитии Android-разработчика.
