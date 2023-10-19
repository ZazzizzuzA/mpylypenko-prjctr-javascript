'use strict';


var number1 = 0;
var number2 = 0;


function createNumbers() {
  number1 = parseInt(prompt('Введіть перше число для першого завдання', ''));
  number2 = parseInt(prompt('Введіть друге число для першого завдання', ''));

  if (isNaN(number1)) {
    alert('Ви ввели невалідне значення для першої змінної');
    return;
  } 

  if (isNaN(number2)) {
    alert('Ви ввели невалідне значення для другої змінної');
    return;
  }

  FirstPartOfTask();
  SecondPartOfTask();
}

function FirstPartOfTask() {
  var span1Decl = document.getElementById('number1');
  var span2Decl = document.getElementById('number2');

  var span1Plus = document.getElementById('number1-plus');
  var span2Plus = document.getElementById('number2-plus');
  var resultPlus = document.getElementById('result-plus');

  var span1Minus = document.getElementById('number1-minus');
  var span2Minus = document.getElementById('number2-minus');
  var resultMinus = document.getElementById('result-minus');

  var span1Digit = document.getElementById('number1-digit');
  var span2Digit = document.getElementById('number2-digit');
  var resultDigit = document.getElementById('result-digit');

  var span1Divide = document.getElementById('number1-divide');
  var span2Divide = document.getElementById('number2-divide');
  var resultDivide = document.getElementById('result-divide');

  var span1Sqrt = document.getElementById('number1-sqrt');
  var span2Sqrt = document.getElementById('number2-sqrt');

  var span1Degree = document.getElementById('number1-degree');
  var span2Degree = document.getElementById('number2-degree');

  span1Decl.value = ' ' + number1;
  span2Decl.value = ' ' + number2;

  span1Plus.innerText = number1 + ' + ';
  span2Plus.innerText = number2;

  resultPlus.innerText = '= ' + (number1 + number2);

  span1Minus.innerText = number1 + ' - ';
  span2Minus.innerText = number2;

  resultMinus.innerText = '= ' + (number1 - number2);

  span1Digit.innerText = number1 + ' * ';
  span2Digit.innerText = number2;

  resultDigit.innerText = '= ' + (number1 * number2);

  span1Divide.innerText = number1 + ' / ';
  span2Divide.innerText = number2;

  resultDivide.innerText = '= ' + (number1 / number2);

  span1Degree.innerText = `${number1} в ступені 5 = ${number1 ** 5}`;
  span2Degree.innerText = `${number2} в ступені 5 = ${number2 ** 5}`;

  span1Sqrt.innerText = `Math.sqrt(${number1}) = ${Math.sqrt(number1)}`;
  span2Sqrt.innerText = `Math.sqrt(${number2}) = ${Math.sqrt(number2)}`;

  console.log('|'.repeat(50));
  console.log('Створіть 2 змінні з типом number. Проведіть з ними такі математичні операції:');
  console.log('|'.repeat(50));

  console.log('Тип 1-ї змінної:', typeof number1);
  console.log('Тип 2-ї змінної:', typeof number2);
  console.log('1. Додавання:', number2 + number1);
  console.log('2. Віднімання:', number1 - number2);
  console.log('3. Множення:', number2 * number1);
  console.log('4. Ділення:', number1 / number2);
  console.log('5. Зведення в ступінь 5 1-ї змінної:', number1 ** 7);
  console.log('6. Знаходження квадратного кореню 1-ї змінної:', number2 + number1);
}

function SecondPartOfTask() {

  console.log('|'.repeat(50));
  console.log('Створіть змінну довільного типу. Проведіть наступні перетворення з нею:');
  console.log('|'.repeat(50));

  var spanCustomVarType = document.getElementById('custom-var-type');
  var spanCustomVarValue = document.getElementById('custom-var-value');

  var spanCustomVarWasType1 = document.getElementById('was-type-1');
  var spanCustomVarWasValue1 = document.getElementById('was-value-1');

  var spanCustomVarIsType1 = document.getElementById('is-type-1');
  var spanCustomVarIsValue1 = document.getElementById('is-value-1');

  var spanCustomVarWasType2 = document.getElementById('was-type-2');
  var spanCustomVarWasValue2 = document.getElementById('was-value-2');

  var spanCustomVarIsType2 = document.getElementById('is-type-2');
  var spanCustomVarIsValue2 = document.getElementById('is-value-2');

  var spanCustomVarWasType3 = document.getElementById('was-type-3');
  var spanCustomVarWasValue3 = document.getElementById('was-value-3');

  var spanCustomVarIsType3 = document.getElementById('is-type-3');
  var spanCustomVarIsValue3 = document.getElementById('is-value-3');

  var customVar = null;

  spanCustomVarType.innerText = typeof customVar;
  spanCustomVarValue.innerText = `${customVar}`;

  console.log('Змінна довільного типу створена. Тип:', typeof customVar + '. Значення:', customVar);

  spanCustomVarWasType1.innerText = typeof customVar;
  spanCustomVarWasValue1.innerText = `${customVar}`;

  customVar = '124354';

  spanCustomVarIsType1.innerText = typeof customVar;
  spanCustomVarIsValue1.innerText = customVar;

  console.log('1. Перетворіть її на рядок. Тип:', typeof customVar + '. Значення:', customVar);

  spanCustomVarWasType2.innerText = typeof customVar;
  spanCustomVarWasValue2.innerText = customVar;

  customVar = +customVar;

  spanCustomVarIsType2.innerText = typeof customVar;
  spanCustomVarIsValue2.innerText = customVar;

  console.log('2. Перетворіть її на число. Тип:', typeof customVar + '. Значення:', customVar);

  spanCustomVarWasType3.innerText = typeof customVar;
  spanCustomVarWasValue3.innerText = customVar;

  customVar = !!customVar;

  spanCustomVarIsType3.innerText = typeof customVar;
  spanCustomVarIsValue3.innerText = customVar;

  console.log('3. Перетворіть її на булеве значення. Тип:', typeof customVar + '. Значення:', customVar);
}



