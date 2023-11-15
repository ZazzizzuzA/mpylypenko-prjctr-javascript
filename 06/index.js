

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

  elManager.clearResultArea();

  function HW6First() {
    function addThemAll(...nums) {
      let result = nums.reduce((acc, el) => {
        return acc += el;
      }, 0);
      elManager.addResultInTextarea(result);
      return result;
    }
    console.log(addThemAll(2, 4));
    console.log(addThemAll(1, 2, 3, 4));
    console.log(addThemAll(5, 5, 10));
    console.log(addThemAll(5, 6, 65, 48, 480, 2, 3, 6, 10, 10, 11));
  }

  elManager.showCode(HW6First);

  if (isManualRun) {
    HW6First();
  }

}

RunFirstTask();

// Функція виконання другої задачі

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.clearResultArea();

  function HW6Second() {
    function multiply(a) {
      return function (b) {
        return a * b;
      }
    }

    console.log(multiply(5)(5)); // 25
    console.log(multiply(2)(-2)); // -4
    console.log(multiply(4)(3)); // 12

    elManager.addResultInTextarea(multiply(5)(5));
    elManager.addResultInTextarea(multiply(2)(-2));
    elManager.addResultInTextarea(multiply(4)(3));
  }

  elManager.showCode(HW6Second);

  if (isManualRun) {
    HW6Second();
  }

}

RunSecondTask();

// Функція виконання третьої задачі

function RunThirdTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-3', 'area-code-3');

  elManager.clearResultArea();

  function HW6Third() {
    const movies = [
      {
        movieName: 'The Thing',
        releaseYear: 1982,
        directedBy: 'Carpenter',
        runningTimeInMinutes: 109,
      },
      {
        movieName: 'Aliens',
        releaseYear: 1986,
        directedBy: 'Cameron',
        runningTimeInMinutes: 137,
      },
      {
        movieName: 'Men in Black',
        releaseYear: 1997,
        directedBy: 'Sonnenfeld',
        runningTimeInMinutes: 98,
      },
      {
        movieName: 'Predator',
        releaseYear: 1987,
        directedBy: 'McTiernan',
        runningTimeInMinutes: 107,
      },
    ];

    function byProperty(property, direction) {
      return (a, b) => {
        let valA = a[property];
        let valB = b[property];

        // тут можна передати замість проперті тип даних параметру 'a': строка або число. В такому випадку кейсів буде лише 2
        switch (property) {
          case 'releaseYear':
            if (direction === '>') {
              return valA - valB;
            } else {
              return valB - valA;
            }
          case 'runningTimeInMinutes':
            if (direction === '>') {
              return valA - valB;
            } else {
              return valB - valA;
            }
          case 'movieName':
            if (direction === '>') {
              if (valA > valB) return 1;
              if (valA < valB) return -1;
              return 0;
            } else {
              if (valA > valB) return -1;
              if (valA < valB) return 1;
              return 0;
            }
          case 'directedBy':
            if (direction === '>') {
              if (valA > valB) return 1;
              if (valA < valB) return -1;
              return 0;
            } else {
              if (valA > valB) return -1;
              if (valA < valB) return 1;
              return 0;
            }
        }
      }
    }

    /* Нижче використовую метод map, щоб після сортування повернувся новий масив, бо метод sort міняє сам масив і значення не зберігаються*/

    let sort1 = movies.sort(byProperty('releaseYear', '>')).map(el => el);
    // виведе масив фільмів посортованих по року випуску, від старішого до новішого
    let sort2 = movies.sort(byProperty('runningTimeInMinutes', '<')).map(el => el);
    // виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
    let sort3 = movies.sort(byProperty('movieName', '>')).map(el => el);
    // виведе масив фільмів посортованих по назві, в алфавітному порядку

    console.log('releaseYear', sort1);
    console.log('runningTimeInMinutes', sort2);
    console.log('movieName', sort3);

    elManager.addResultInTextarea('releaseYear >', ';\r');
    elManager.addResultInTextarea(sort1.map(el => el.releaseYear), ':\r');
    elManager.addResultInTextarea('runningTimeInMinutes <', ';\r');
    elManager.addResultInTextarea(sort2.map(el => el.runningTimeInMinutes), ':\r');
    elManager.addResultInTextarea('movieName >', ';\r');
    elManager.addResultInTextarea(sort3.map(el => el.movieName), ':\r');
  }

  elManager.showCode(HW6Third);

  if (isManualRun) {
    HW6Third();
  }

}

RunThirdTask();

// Функція виконання четвертої задачі

function RunFourthTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-4', 'area-code-4');

  elManager.clearResultArea();

  function HW6Fourth() {

    const userNames = ['Петро', 'Емма', 'Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена', 'Емма'];

    function filterUnique(array) {
      let namesSet = new Set(userNames);
      return Array.from(namesSet);
    }

    console.log(filterUnique(userNames)); // ['Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];

    elManager.addResultInTextarea(filterUnique(userNames));
  }

  elManager.showCode(HW6Fourth);

  if (isManualRun) {
    HW6Fourth();
  }

}

RunFourthTask();