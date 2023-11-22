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

// Функція виконання першої задачі

function RunFirstTask(isManualRun = false) {
  const elManager = ManagerHTMLElements('area-result-1', 'area-code-1');

  elManager.clearResultArea();

  function HW7First() {
    function detonatorTimer(delay) {
      let counter = delay;
      let intervalHandler = setInterval(() => {
        if (counter === 0) {
          console.log('-=||BOOM!||=-');
          clearInterval(intervalHandler);
          elManager.addResultInTextarea('-=||BOOM!||=-');
        } else {
          console.log(counter);
          elManager.addResultInTextarea(counter);
        };
        counter--;
      }, 1000);
    }

    detonatorTimer(3);
  }

  elManager.showCode(HW7First);

  if (isManualRun) {
    HW7First();
  }
}

RunFirstTask();

// Функція виконання другої задачі

function RunSecondTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-2', 'area-code-2');

  elManager.clearResultArea();

  function HW7Second() {
    function detonatorTimer(delay) {
      let counter = delay;
      let callback = () => {
        clearTimeout(timeoutHandler);
        if (counter === 0) {
          console.log('-=||BOOM!||=-');
          elManager.addResultInTextarea('-=||BOOM!||=-');
        } else {
          console.log(counter);
          elManager.addResultInTextarea(counter);
          timeoutHandler = setTimeout(callback, 1000);
        };
        counter--;
      }
      let timeoutHandler = setTimeout(callback, 1000);
    }

    detonatorTimer(3);
  }

  elManager.showCode(HW7Second);

  if (isManualRun) {
    HW7Second();
  }

}

RunSecondTask();

// Функція виконання третьої задачі

function RunThirdTask(isManualRun = false, prop = 'ALL') {

  const elManager = ManagerHTMLElements('area-result-3', 'area-code-3');

  elManager.clearResultArea();

  function HW7Third() {
    function ownObject(property) {
      let allGetters = [
        'introduce',
        'prognose',
        'describeMyMood',
        'thoughts',
        'getName',
        'getAmountOfEyes',
        'getIdea'
      ];
      let me = {
        name: 'Mykhailo',
        residency: 'Kyiv',
        gender: 'male',
        age: 87,
        hobby: 'sitting',
        defaultMood: 'drifting',
        currentMood: 'sleepy',
        amountOfEyes: 2,
        repeatSomeOneWords: "Existing only emptiness and atoms",
        credo: "Live and let live others",
        idea: 'no idea',
        introduce() {
          let text = `My name is ${this.name} and I live in ${this.residency}`;
          elManager.addResultInTextarea(text, '\r');
          console.log(text);
          return text;
        },
        prognose() {
          let text = `I hope that next year I'm gonna be ${this.age + 1}`;
          elManager.addResultInTextarea(text, '\r');
          console.log(text);
          return text;
        },
        describeMyMood() {
          let text = `Mostly I'm ${this.defaultMood}, but now I'm ${this.currentMood}`;
          elManager.addResultInTextarea(text, '\r');
          console.log(text);
          return text;
        },
        thoughts() {
          let thoughts = `Sometimes thinking about future, but understanding, that ${this.repeatSomeOneWords}, gives me only reason keep living with credo: ${this.credo}`;
          console.log(thoughts);
          elManager.addResultInTextarea(thoughts, '\r');
          return thoughts;
        },
        getName() {
          console.log(this.name);
          elManager.addResultInTextarea(this.name, '\r');
          return this.name;
        },
        getAmountOfEyes() {
          console.log(this.amountOfEyes);
          elManager.addResultInTextarea(this.amountOfEyes, '\r');
          return this.amountOfEyes;
        },
        getIdea() {
          console.log(this.idea);
          elManager.addResultInTextarea(this.idea, '\r');
          return this.idea;
        }
      }
  
      if (property === 'ALL') {
        for (let getter of allGetters) {
          me[getter]();
        }
      } else {
        me[property]();
      }
    }
    ownObject(prop)
  }

  elManager.showCode(HW7Third);

  if (isManualRun) {
    HW7Third();
  }

}

RunThirdTask();

// Функція виконання четвертої задачі

function RunFourthTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-4', 'area-code-4');

  elManager.clearResultArea();

  function HW7Fourth() {
    function ownObject() {
      let allGetters = [
        'introduce',
        'prognose',
        'describeMyMood',
        'thoughts',
        'getName',
        'getAmountOfEyes',
        'getIdea'
      ];
      let me = {
        name: 'Mykhailo',
        residency: 'Kyiv',
        gender: 'male',
        age: 87,
        hobby: 'sitting',
        defaultMood: 'drifting',
        currentMood: 'sleepy',
        amountOfEyes: 2,
        repeatSomeOneWords: "Existing only emptiness and atoms",
        credo: "Live and let live others",
        idea: 'no idea',
        introduce() {
          let text = `My name is ${this.name} and I live in ${this.residency}`;
          elManager.addResultInTextarea(text, '\r');
          console.log(text);
          return text;
        },
        prognose() {
          let text = `I hope that next year I'm gonna be ${this.age + 1}`;
          elManager.addResultInTextarea(text, '\r');
          console.log(text);
          return text;
        },
        describeMyMood() {
          let text = `Mostly I'm ${this.defaultMood}, but now I'm ${this.currentMood}`;
          elManager.addResultInTextarea(text, '\r');
          console.log(text);
          return text;
        },
        thoughts() {
          let thoughts = `Sometimes thinking about future, but understanding, that ${this.repeatSomeOneWords}, gives me only reason keep living with credo: ${this.credo}`;
          console.log(thoughts);
          elManager.addResultInTextarea(thoughts, '\r');
          return thoughts;
        },
        getName() {
          console.log(this.name);
          elManager.addResultInTextarea(this.name, '\r');
          return this.name;
        },
        getAmountOfEyes() {
          console.log(this.amountOfEyes);
          elManager.addResultInTextarea(this.amountOfEyes, '\r');
          return this.amountOfEyes;
        },
        getIdea() {
          console.log(this.idea);
          elManager.addResultInTextarea(this.idea, '\r');
          return this.idea;
        }
      }

      let timer = 1000;

      for (let getter of allGetters) {
        let secureGetter = function() {
          this[getter]();
          clearTimeout(timeoutHandler)
        }

        let timeoutHandler = setTimeout(secureGetter.bind(me), timer);
        timer += 1000;
      }
     
      // let securedSelfIntroduce = function() {
      //   this.introduce();
      // };

      // setTimeout(securedSelfIntroduce.bind(me), 1000);

      // let securedSelfPrognose = function() {
      //   this.prognose();
      // }

      // setTimeout(securedSelfPrognose.bind(me), 2000);

      // let securedSelfDescribeMyMood = function() {
      //   this.describeMyMood();
      // }

      // setTimeout(securedSelfDescribeMyMood.bind(me), 3000);    
      
      // let securedSelfGetName = function() {
      //   this.getName();
      // }

      // setTimeout(securedSelfGetName.bind(me), 4000);

      // let securedSelfThoughts = function() {
      //   this.thoughts();
      // }

      // setTimeout(securedSelfThoughts.bind(me), 5000);
    }

    ownObject();
  }

  elManager.showCode(HW7Fourth);

  if (isManualRun) {
    HW7Fourth();
  }

}

RunFourthTask();

// Функція виконання п'ятої задачі

function RunFifthTask(isManualRun = false) {

  const elManager = ManagerHTMLElements('area-result-5', 'area-code-5');

  elManager.clearResultArea();

  function HW7Fifth() {
    function sampleOfDebaunce() {
      function someFunction() {
        console.log(new Date().toISOString());
        elManager.addResultInTextarea(new Date().toISOString(), '\r');
        return new Date().toISOString();
      }

      function slower(func, seconds) {
        return function() {
          console.log(`Chill out, you will get your result in ${seconds} seconds...`);
          elManager.addResultInTextarea(`Chill out, you will get your result in ${seconds} seconds...`, '/r');
          let timeoutCallback = function() {
            func();
            clearTimeout(timeoutHandler);
          }
          let timeoutHandler = setTimeout(timeoutCallback, seconds * 1000);
        }
      }

      let slowedSomeFunction = slower(someFunction, 5);

      slowedSomeFunction();

    }

    sampleOfDebaunce();
  }

  elManager.showCode(HW7Fifth);

  if (isManualRun) {
    HW7Fifth();
  }

}

RunFifthTask();