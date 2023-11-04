// Функція виконання першої задачі

function ManagerHTMLElements(resultAreaId, codeAreaId) {
  return {
    resultAreaId,
    codeAreaId,
    getResultTextarea() {
      return document.getElementById(this.resultAreaId);
    },

    clearResultArea(ids) {
      this.getResultTextarea().value = '';
      if (ids) {
        ids.forEach(id => this.getCustomElemById(id).value = '');
      }
      console.clear();
    },

    addResultInTextarea(result, divider = '; ') {
      const resultArea = this.getResultTextarea();
      let areaValue = resultArea.value;
      if (!areaValue) {
        resultArea.value += result;
        return;
      }
      resultArea.value += divider + result;
    },

    getCodeArea() {
      return document.getElementById(this.codeAreaId);
    },

    showCode(funcToShow) {
      const codeArea = this.getCodeArea();
      codeArea.value = funcToShow.toString().replace(/function HW[0-9]{1,2}(First|Second|Third|Fourth)\(\) \{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
    },

    getCustomElemById(id) {
      return document.getElementById(id);
    },

    addResultInCustomTextarea(id, result, divider = '; ') {
      const resultArea = this.getCustomElemById(id);
      let areaValue = resultArea.value;
      if (!areaValue) {
        resultArea.value += result;
        return;
      }
      resultArea.value += divider + result;
    },

    showCodeInCustomElem(id, funcToShow) {
      const codeArea = this.getCustomElemById(id);
      codeArea.value = funcToShow.toString().replace(/function.[^{}]*\{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
    },

  }
}

function RunFirstTask(isManualRun = false) {
  const elManager = ManagerHTMLElements('area-result-1', 'area-code-1');

  elManager.clearResultArea();

  function HW4First() {
    const userNames = [
      "Петрик Ольга Іванівна",
      "Гнатюк Петро Антонович",
      "Рудко Андрій Опанасович",
      "Андрій Совенко Миколайович",
      "Юрко Микитюк Станіславович"
    ];
    let initials = userNames.map(el => {
      return el.split(/\s|\n/).map(item => item = item[0] + '.').join('');
    }).sort();
    elManager.addResultInTextarea(initials.join(', '));
    console.log(initials);
  }

  elManager.showCode(HW4First);

  if (isManualRun) {
    HW4First();
  }

}

RunFirstTask();

// Функція виконання другої задачі

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.clearResultArea(['area-result-2', 'area-result-2-1', 'area-result-2-2']);

  function usingIfElse(userNames) {
    let names = userNames;
    let counter = 0
    let newNames = [];
    const letters = ['а', 'е', 'є', 'и', 'і', 'ї', 'о', 'у', 'ю', 'я'];

    while (counter < names.length) {

      let name = names[counter];
      if (letters.includes(name[0].toLowerCase())) {
        newNames.push(name);
      }
      counter++;
    }
    elManager.addResultInCustomTextarea('area-result-2-1', newNames.join(', '), ';\r');
    return newNames;
  }

  function usingArrayMethod(userNames) {
    const letters = ['а', 'е', 'є', 'и', 'і', 'ї', 'о', 'у', 'ю', 'я'];
    let names = userNames.filter(el => {
      if (letters.includes(el[0].toLowerCase())) {
        return el;
      }
    });

    elManager.addResultInCustomTextarea('area-result-2-2', names.join(', '), ';\r');

    return names;
  }


  function HW4Second() {
    const userNames = ['Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];

    let filteredNamesUsingIfElse = usingIfElse(userNames);
    let filteredNamesUsingArrayMethod = usingArrayMethod(userNames);

    console.log('Using if...else:', filteredNamesUsingIfElse);
    console.log('Using array\'s method:', filteredNamesUsingArrayMethod);

    elManager.addResultInTextarea(filteredNamesUsingIfElse);
    elManager.addResultInTextarea(filteredNamesUsingArrayMethod);

  }

  elManager.showCode(HW4Second);
  elManager.showCodeInCustomElem('area-code-2-1', usingIfElse);
  elManager.showCodeInCustomElem('area-code-2-2', usingArrayMethod);

  if (isManualRun) {
    HW4Second();
  }

}

RunSecondTask();

// Функція виконання другої задачі

function RunThirdTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-3', 'area-code-3');

  function HW4Third(num) {
    const currentMaxValue = num;
    if (currentMaxValue.search(/[a-zA-Z]/) > -1) {
      alert('Ви ввели недопустиме значення. Спробуйте ще раз.');
      return;
    }
    let reverseMaxValue;

    reverseMaxValue = parseInt(currentMaxValue.split('').reverse().join(''));

    console.log(reverseMaxValue);
    console.log(typeof reverseMaxValue);

    elManager.addResultInTextarea(typeof reverseMaxValue);
    elManager.addResultInTextarea(reverseMaxValue, ' - ');
  }

  elManager.showCode(HW4Third);

  if (isManualRun) {
    let value = prompt('Введіть будь-яке число:', '');
    HW4Third(value);
  }

}

RunThirdTask();

// Функція виконання четвертої задачі

function RunFourthTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-4', 'area-code-4');

  function HW4Fourth() {
    const resultsArray = [1, 2, [3, [4]]];
    let productOfArray;
    resultsArray.flat(Infinity).reduce((acc, num) => {
      if (!productOfArray) {
        productOfArray = num;
        return productOfArray;
      };
      productOfArray = productOfArray * num;
      return productOfArray;
    }, productOfArray);

    console.log(productOfArray);

    elManager.addResultInTextarea(productOfArray);
  }

  elManager.showCode(HW4Fourth);

  if (isManualRun) {
    HW4Fourth();
  }

}

RunFourthTask();
