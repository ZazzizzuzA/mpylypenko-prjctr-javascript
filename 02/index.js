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
      codeArea.value = funcToShow.toString().replace(/function (cycleLogic|actionFunc)\(\) \{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
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

  elManager.showCode(cycleLogic);

  function cycleLogic() {
    elManager.clearResultArea(); // to clear textarea and console if repeat
    const finish = 100;
    for (let i = 1; i <= finish; i++) {
      let resultToView = i % 3 === 0 && i % 5 === 0 ? 'ЛолКек' : i % 3 === 0 ? 'Лол' : i % 5 === 0 ? 'Кек' : i;
      console.log(resultToView);

      elManager.addResultInTextarea(resultToView, '; '); // functionality to show result in texarea "Результат"
    }
  }

  if (isManualRun) {
    cycleLogic();
  }
 
}

RunFirstTask();

// Функція виконання другої задачі

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.showCode(actionFunc);
  elManager.showCodeInCustomElem('area-code-3', usingWhile);
  elManager.showCodeInCustomElem('area-code-4', usingForlet);

  function generateNewValue() {
    const newVal = (Math.round(Math.random() * 100) * 100) / 100;
    alert(`Ви вирішили не вводити значення. Що ж... сам придумаю. Буде: ${newVal}`);
    return newVal;
  }

  function isValueValid(Value) {
    let intValue = +Value;
    if (isNaN(intValue) || Value === '') {
      console.error('Таке чуство шо Бог десь наказує нас за шось');
      alert(`Значення "${Value}" не валідне. Спробуйте ще раз ;-)`);
      actionFunc();
      return false;
    } else if (Value === null) {
      return null;      
    }
  }

  function usingWhile(value) {
    const finish = value;
    let counter = 1;
    while(counter < finish) {
      if (counter % 2 === 0 ) {
        console.log('while', counter);
        elManager.addResultInTextarea('while ' + counter, ';\r'); // show result in summary textarea
        elManager.addResultInCustomTextarea('area-result-3', 'while ' + counter, ';\r'); // show result in textarea for "while"

      }
      counter += 1;
    }
  }

  function usingForlet(value) {
    const finish = value;
    for (let i = 1; i < finish; i++) {
      if (i % 2 === 0) {
        console.log('for...let', i);
        elManager.addResultInTextarea('for...let ' + i, ';\r'); // show result in summary textarea
        elManager.addResultInCustomTextarea('area-result-4', 'for...let ' + i, ';\r'); // show result in textarea for "for"
      }
    }
  }

  function actionFunc() {
    elManager.clearResultArea(['area-result-3', 'area-result-4']);
    let Value = prompt('Введіть будь-яке число', '');
    let intValue = +Value;

    if (isValueValid(Value) === false) {
      return;
    } else if (isValueValid(Value) === null) {
      intValue = generateNewValue();
    }

    usingWhile(intValue) // using while
    usingForlet(intValue) // using for...let
  }

  if (isManualRun) {
    actionFunc();
  }

}

RunSecondTask();

