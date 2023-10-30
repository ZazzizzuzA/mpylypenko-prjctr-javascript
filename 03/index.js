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
      codeArea.value = funcToShow.toString().replace(/function (recurseLogic|iterativeLogic)\(\) \{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
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

  elManager.showCode(recurseLogic);

  function recurseLogic(intStr = prompt('Введіть яке-небудь число:', '')) {
  
    let int = +intStr;
    let oddsSumm = 0;

    if (isNaN(int) || intStr === null || intStr === '') {
      alert(`Значення "${intStr}" не валідне, йопта... Лови рекурсію)`);
      recurseLogic();
      return;
    }

    function summing(num) {
      if (num >= 1) {
        if (num % 2 !== 0) {
          oddsSumm += num;
          summing(num - 2);
          return;
        } else {
          summing(num - 1);
          return;
        }
      }
  
      alert(`Всі непарні додатні числа були просумовані: ${oddsSumm}`);
      elManager.addResultInTextarea(oddsSumm, '; '); // functionality to show result in texarea "Результат"
      return oddsSumm;
    }

    return summing(int);
  }

  if (isManualRun) {
    recurseLogic();
  }
 
}

RunFirstTask();

// Функція виконання другої задачі

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.showCode(iterativeLogic);

  function iterativeLogic(intStr = prompt('Введіть яке-небудь число:', '')) {
    let int = +intStr;
    let oddsSumm = 0;

    if (isNaN(int) || intStr === null || intStr === '') {
      alert(`Значення "${intStr}" не валідне, йопта... Лови рекурсію ітерації)`);
      iterativeLogic();
      return;
    }

    if (int < 0) {
      alert(`Введене число від'ємне: ${oddsSumm}`);
      return;
    }

    while (int > 0) {
      if (int % 2 !== 0) {
        oddsSumm += int;
        int -= 2
      } else {
        int--;
      }
    }

    alert(`Всі непарні додатні числа були просумовані: ${oddsSumm}`);
    elManager.addResultInTextarea(oddsSumm, '; '); // functionality to show result in texarea "Результат"
    return oddsSumm;
  }

  if (isManualRun) {
    iterativeLogic();
  }

}

RunSecondTask();

