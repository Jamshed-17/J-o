 - [x] Написать программу которая проверяет является ли квадрат магическим
 ```cpp
 #include <iostream>
int main(){
    int a [3][3] =  {{2, 9, 4},
                     {7, 5, 3},
                     {6, 1, 8}};
    int sum = a[0][0] + a[0][1] + a[0][2];
    if ((a[0][0] + a[1][1] + a[2][2]) == sum){
        if ((a[0][2] + a[1][1] + a[2][0]) == sum){
            if ((a[0][0] + a[0][1] + a[0][2]) == sum){
                if ((a[1][0] + a[1][1] + a[1][2]) == sum){
                    if ((a[2][0] + a[2][1] + a[2][2]) == sum){
                        if ((a[0][0] + a[1][0] + a[2][0]) == sum){
                            if ((a[1][0] + a[1][1] + a[1][2]) == sum){
                                if ((a[2][0] + a[2][1] + a[2][2]) == sum){
                                    std::cout<<"Это магический квадрат";}}}}}}}}
    else{std::cout<<"Это не магический квадрат";}}

```

- [ ] Натуральное число в P-ичной системе счисление задано своими числами хранящимися в массиве K. Проверить корректность такого представления и перевести число в Q-ичную систему. P и Q - меньше 10.
```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <stdexcept>
using namespace std;

bool Chec(int K[], int P, int n) {
    for (int i = 0; i < n; i++) {
        if (K[i] >= P) {
            return false;
        }
    }
    return true;
}

int tenSS(int K[], int P, int n) {
    int sum = 0;
    for (int i = 0, j = n - 1; i < n; i++, j--) {
        sum += (pow(P, j) * K[i]);
    }
    return sum;
}

string toQ(int S, int Q) {
    if (Q < 2 || Q > 9) {
        throw invalid_argument("Только от 2 до 4");
    }

    string result;
    while (S > 0) {
        int num = S % Q;
        result += to_string(num);
        S /= Q;
    }

    reverse(result.begin(), result.end());
    return result;
}

int main() {
    int P, Q;
    string K;
    
    cout << "Введите из какой системы будем конвертировать" << endl;
    cin >> P;
    cout << "Введите ваше число" << endl;
    cin >> K;
    cout << "Введите в какую систему будем переводить" << endl;
    cin >> Q;

    int n = K.size();
    int arr[n];

    for (size_t i = 0; i < n; ++i) {
        arr[i] = K[i] - '0';
    }

    if (Chec(arr, P, n)) {
        int sum = tenSS(arr, P, n);
        try {
            string result = toQ(sum, Q);
            cout << result << endl;
        } catch (const invalid_argument& e) {
            cerr << e.what() << endl;
        }
    } else {
        cout << "Недопустимое число для указанной системы счисления" << endl;
    }

    return 0;
}

```

Исходные данные - P - система счисления в котором представлено исходное число. K - строка с числами. Q - система счисления в которую нужно перенести число. Результат - R - число в Q системе счисления.

Мат. модель:
1. Ввод исходных данных. 
2. Проверка число на соответствие системе счисления.
3. Перевод в другую систему счисления. (P - 10 - Q)
4. Вывод данных.