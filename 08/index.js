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

  function HW8First() {
    let elementWithText = 'let elementWithText = document.getElementById(\'headerTwo\') // поверне <h2 id="headerTwo">Навігація по DOM дереву</h2>';
    let firstElementSection = 'let firstElementSection = document.getElementsByTagName(\'section\')[0] // поверне <section class=\'firstSection\'>...</section>';
    let elementFromTheListWithtext = 'let elementFromTheListWithtext = document.querySelector(\'ul > li:nth-child(5)\') // поверне <li>Пункт 5</li>';
    let elementWithSpecificClass = 'let elementWithSpecificClass = document.getElementsByClassName(\'hatredLevelBlock\')[0] // поверне <div class="hatredLevelBlock">...</div>';

    elManager.addResultInTextarea(elementWithText);
    elManager.addResultInTextarea(firstElementSection, ';\n\n');
    elManager.addResultInTextarea(elementFromTheListWithtext, ';\n\n');
    elManager.addResultInTextarea(elementWithSpecificClass, ';\n\n');
  }

  HW8First();

}

RunFirstTask();
