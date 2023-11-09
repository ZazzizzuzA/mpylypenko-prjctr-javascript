

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

// Функція виконання першої задачі

function RunFirstTask(isManualRun = false) {
  const elManager = ManagerHTMLElements('area-result-1', 'area-code-1');

  // elManager.clearResultArea();

  function HW5First(startPeriod = new Date(0), endPeriod = new Date(), dimension = 'days') {
    console.log(startPeriod, endPeriod, dimension);
    if (!startPeriod || !endPeriod) {
      alert('Дані невалідні або відсутні. Будуть використані стандартні дані.');
      startPeriod = new Date(0);
      endPeriod = new Date();
      dimension = 'days';
    }

    let startDateNumValue = new Date(startPeriod).getTime();
    let endDateNumValue = new Date(endPeriod).getTime();

    const methods = {
      days: function() {
        const dayInMS = new Date(Date.UTC(1970, 0, 2)).getTime();
        return ((endDateNumValue - startDateNumValue) / dayInMS).toFixed();
      },
  
      seconds: function() {
        const secondInMS = new Date(0).setSeconds(new Date(0).getSeconds() + 1);
        return ((endDateNumValue - startDateNumValue) / secondInMS).toFixed();
      }, 
  
      minutes: function() {
        const minuteInMS = new Date(0).setMinutes(new Date(0).getMinutes() + 1);
        return ((endDateNumValue - startDateNumValue) / minuteInMS).toFixed();
      },
  
      hours: function() {
        const hourInMS = new Date(0).setHours(new Date(0).getHours() + 1);
        return ((endDateNumValue - startDateNumValue) / hourInMS).toFixed();
      }
    }

    let result = methods[dimension]();

    console.log(`${dimension[0].toUpperCase() + dimension.slice(1, dimension.length)}:`, result);
    elManager.addResultInTextarea(`${dimension[0].toUpperCase() + dimension.slice(1, dimension.length)}: ${result}`);
  }

  elManager.showCode(HW5First);

  if (isManualRun) {
    let startPeriod = document.querySelector('#start-date').value ? document.querySelector('#start-date').value : null,
        endPeriod = document.querySelector('#end-date').value ? document.querySelector('#end-date').value : null,
        dimension = document.querySelector('#dimension').value;
    HW5First(startPeriod, endPeriod, dimension);
  }

}

RunFirstTask();

// Функція виконання другої задачі

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.clearResultArea();

  function HW5Second() {
    const priceData = {
      Apples: '23.4',
      BANANAS: '48',
      oRAngGEs: '48.7584',
    };
    let entries = Object.entries(priceData);

    entries.forEach(el => {
      let key = el[0],
          val = el[1].toString();

      el[0] = key.toLowerCase();

      if (val.split('.')[1]) {

        if (val.split('.')[1].length > 2) {

          el[1] = (Math.round(+val * 100) / 100).toString();

        } else if (val.split('.')[1].length < 2) {

          el[1] = val + '0';

        }
      } else if (!val.split('.')[1]) {

        el[1] = val + '.00';

      }      
    });

    let result = Object.fromEntries(entries);
    console.log(result);
    elManager.addResultInTextarea(JSON.stringify(result));
  }

  elManager.showCode(HW5Second);

  if (isManualRun) {
    HW5Second();
  }

}

RunSecondTask();