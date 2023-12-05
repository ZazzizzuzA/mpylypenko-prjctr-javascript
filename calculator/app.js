"use strict";

// оголошуємо змінні
const input = document.querySelector(".input");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const result = document.querySelector(".result");

const operatorsList = ["+", "-", "×", "÷", "."];
let isResultDisplayed = false;

// додаємо обробники подій для всіх кнопок з математичними операторами
operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    // отримуємо доступ до оператора
    const operatorValue = event.target.innerHTML;
    // отримуємо доступ до значення всередині інпута
    const inputValue = input.innerHTML;
    // отримуємо доступ до останнього елемента інпута (останній елемент строки)
    const lastChar = inputValue.at(-1);

    // якщо строка пуста, оператор не додаємо, код зупиняється
    if (inputValue === "") {
      return null;
    }

    // якщо в останній елемент в інпуті це оператор, то перезаписуємо його
    if (operatorsList.includes(lastChar)) {
      const newInputValue = inputValue.substring(0, inputValue.length - 1);
      input.innerHTML = newInputValue + operatorValue;
    } else {
      // в іншому випадку додаємо до строки
      input.innerHTML += operatorValue;
    }

    isResultDisplayed = true;
  });
});

// додамо обробники подій для всіх кнопок з цифрами
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    // отримуємо доступ до цифри
    const numberValue = event.target.innerHTML;
    // отримуємо доступ до значення всередині інпута
    const inputValue = input.innerHTML;
    // отримуємо доступ до останнього елемента інпута (останній елемент строки)
    const lastChar = inputValue.at(-1);

    // якщо в інпуті останній елемент крапка і ми нажимаємо на ще одну крапку - код зупиняється
    if (lastChar === "." && numberValue === ".") {
      return null;
    }

    // якщо юзер просто вводить число - то ми його додаємо до введеної операції
    if (!isResultDisplayed) {
      input.innerHTML += numberValue;
    } else if (isResultDisplayed && operatorsList.includes(lastChar)) {
      // якщо юзер вводить число коли вже висвічується результат попередньої операції і оператор є останнім символом інпута
      // введене число додаємо до інпута
      input.innerHTML += numberValue;
      isResultDisplayed = false;
    } else {
      // якщо юзер вводить число коли відображається результат попередньої операції
      // ми перезаписуємо весь інпут новим числом
      input.innerHTML = numberValue;
      isResultDisplayed = false;
    }
  });
});

clear.addEventListener("click", () => {
  // очищуємо значення в рядку
  input.innerHTML = "";
  // ставимо позначку що це вже не результат попередньої введеної операції
  isResultDisplyed = false;
});

result.addEventListener("click", () => {
  // отримуємо доступ до значення всередині інпута
  const inputValue = input.innerHTML;
  // отримуємо доступ до останнього елемента інпута (останній елемент строки)
  const lastChar = inputValue.at(-1);

  // якщо юзер останнім символом ввів оператор і натискає на отримання результату
  if (operatorsList.includes(lastChar)) {
    return null;
  }

  // отримуємо масив всіх введених чисел
  const numbersOnly = inputValue.split(/\+|\-|\×|\÷/g);
  // отримуємо масив всіх введених операторів (їх завжди менше на один ніж введених чисел)
  const operatorsOnly = inputValue.replace(/[0-9]|\./g, "").split("");

  // ділення
  // знаходимо перший оператор ділення серед всіх операторів
  let dividerIndex = operatorsOnly.indexOf("÷");
  // доки оператор ділення є у масиві операторів (onlyOperators)
  while (dividerIndex !== -1) {
    // знаходимо у масиві значення чисел які знаходяться на цьому ж індексі що й оператор і наступне число і ділимо їх
    const result = numbersOnly[dividerIndex] / numbersOnly[dividerIndex + 1];

    // і замінюємо їх на результат
    numbersOnly.splice(dividerIndex, 2, result);
    // видаляємо цей оператор ділення з масиву операторів
    operatorsOnly.splice(dividerIndex, 1);

    // знаходимо наступний оператор ділення серед всіх операторів
    dividerIndex = operatorsOnly.indexOf("÷");
  }

  // множення
  let multiplyIndex = operatorsOnly.indexOf("×");

  while (multiplyIndex !== -1) {
    const result = numbersOnly[multiplyIndex] * numbersOnly[multiplyIndex + 1];

    numbersOnly.splice(multiplyIndex, 2, result);
    operatorsOnly.splice(multiplyIndex, 1);

    multiplyIndex = operatorsOnly.indexOf("×");
  }

  // віднімання
  let substractIndex = operatorsOnly.indexOf("-");
  while (substractIndex !== -1) {
    const result =
      numbersOnly[substractIndex] - numbersOnly[substractIndex + 1];

    numbersOnly.splice(substractIndex, 2, result);
    operatorsOnly.splice(substractIndex, 1);

    substractIndex = operatorsOnly.indexOf("-");
  }

  // додавання
  let sumIndex = operatorsOnly.indexOf("+");
  while (sumIndex !== -1) {
    const result =
      parseFloat(numbersOnly[sumIndex]) + parseFloat(numbersOnly[sumIndex + 1]);

    numbersOnly.splice(sumIndex, 2, result);
    operatorsOnly.splice(sumIndex, 1);

    sumIndex = operatorsOnly.indexOf("+");
  }

  // замінюємо значення введеної операції на її результат
  input.innerHTML = numbersOnly[0];
  // ставимо позначку що це вже результат введеної операції
  isResultDisplayed = true;
});