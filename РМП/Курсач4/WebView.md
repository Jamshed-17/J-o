## **Через Android Studio (контроль над кодом)

**Шаги:**

1. Создайте новый проект → **"Empty Activity"**

2. Откройте `activity_main.xml` → добавьте WebView:

```xml

<WebView

android:id="@+id/webview"

android:layout_width="match_parent"

android:layout_height="match_parent" />

```

  

3. В `MainActivity.kt`:

```kotlin

val webView = findViewById<WebView>(R.id.webview)

webView.settings.javaScriptEnabled = true // Включить JS

webView.loadUrl("https://ВАШ_САЙТ.ru")

webView.webViewClient = WebViewClient() // Открывать ссылки внутри приложения

```

  

4. Добавьте разрешение в `AndroidManifest.xml`:

```xml

<uses-permission android:name="android.permission.INTERNET" />

```

  

5. Соберите APK: **Build > Generate Signed Bundle / APK**
