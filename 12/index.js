"use strict";

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
      codeArea.value = funcToShow.toString().replace(/function HW[0-9]{1,2}(First|Second|Third|Fourth|Fifth)\(\) \{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
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

  function HW12First() {
    console.log('start');
    elManager.addResultInTextarea('start', '\r');

    const promise1 = new Promise((resolve, reject) => {
      console.log(1)
      elManager.addResultInTextarea(1, '\r');

      resolve(2)
    })

    promise1.then(res => {
      console.log(res)
      elManager.addResultInTextarea(res, '\r');

    })

    console.log('end');
    elManager.addResultInTextarea('end', '\r');

  }

  elManager.showCode(HW12First);

  if (isManualRun) {
    HW12First();
  }

}

RunFirstTask();

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.clearResultArea();

  function HW12Second() {
    Promise.resolve(1)
      .then((x) => {
        elManager.addResultInTextarea('.then((x) => x + 1) -> Отримали "1" від "resolve" метода, додали 1 та відправили далі...', '\r\r');
        return x + 1;
      })
      .then((x) => {
        elManager.addResultInTextarea('.then((x) => { throw new Error(\'My Error\') }) ->...отримали значення "2", але викинули помилку для подальшої обробки, тому наступним обробиця перший метод "catch"...', '\r\r');
        throw new Error('My Error')
      })
      .catch(() => {
        elManager.addResultInTextarea('.catch(() => 1) -> ...тут обробляється помилка; повертає "1" для подальшої роботи...', '\r\r');
        return 1;
      })
      .then((x) => {
        elManager.addResultInTextarea('.then((x) => x + 1) -> ...отримали "1" від попереднього "catch" метода, додали 1 та відправили далі "2"...', '\r\r');
        return x + 1;
      })
      .then((x) => {
        elManager.addResultInTextarea('.then((x) => console.log(x)) -> ...виводимо отримане значення від попереднього методу "then" та виводимо його тут. catch(console.error) -> не опрацьовується.', '\r\r');

        console.log(x);
      })
      .catch((er) => {
        elManager.addResultInTextarea('.catch(console.error) -> Останній метод catch не опрацьовується. І цього повідомлення не буде в зоні "Результат".', '\r\r');

        console.error(er)
      })
  }

  elManager.showCode(HW12Second);

  if (isManualRun) {
    HW12Second();
  }

}

RunSecondTask();


function RunThirdTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-3', 'area-code-3');

  elManager.clearResultArea();

  function HW12Third() {
    const promise = new Promise(res => res(2));
    elManager.addResultInTextarea('const promise = new Promise(res => res(2)); -> Векларуємо проміс з коллбеком, яким резолвить значення 2 і передає його далі по ланцюгу методів...', '\r\r');

    promise.then(v => {
      elManager.addResultInTextarea('1-й метод then -> ...виводить в консоль отримане значення - "2", потім множить його на 2 та повертає далі по ланцюгу методів...', '\r\r');
      console.log(v);
      return v * 2;
    })
      .then(v => {
        elManager.addResultInTextarea('2-й метод then -> ...виводить в консоль отримане значення - "4", потім множить його на 2 та повертає далі по ланцюгу методів...', '\r\r');
        console.log(v);
        return v * 2;
      })
      .finally(v => {
        elManager.addResultInTextarea('3-й метод finally -> ...виводить в консоль "undefined", бо цей метод не приймає аргументів, тобто результат методу "then" не можна передати в метод "finally". Хоча метод і повертає якесь значення, але воно нікуди не потрапляє далі...', '\r\r');

        console.log(v);
        return v * 2;
      })
      .then(v => {
        elManager.addResultInTextarea('4-й метод finally -> ...виводить в консоль "8", бо цей метод приймає значення, яке повертає останній метод "then".', '\r\r');
        console.log(v);
      });

  }

  elManager.showCode(HW12Third);

  if (isManualRun) {
    HW12Third();
  }

}

RunThirdTask();