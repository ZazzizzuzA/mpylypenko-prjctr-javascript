"use strict";

import firstTabContent from './firstTabContent.js';
import secondTabContent from './secondTabContent.js';
import tableLogic from './tableLogic.js';
import tableFirstContent from './tableFirstContent.js';
import tableSecondContent from './tableSecondContent.js';


function main() {
  const divContent = document.querySelector('#contentFormResult');
  const tableDiv = document.querySelector('#contentTable');
  const tabs = [
    {
      index: 0,
      formContent: firstTabContent,
      tableContent: tableFirstContent,
      formContainer: divContent,
      tableContainer: tableDiv
    },
    {
      index: 1,
      formContent: secondTabContent,
      tableContent: tableSecondContent,
      formContainer: divContent,
      tableContainer: tableDiv
    }
  ];


  divContent.addEventListener('transitionend', event => {
    const index = divContent.hasAttribute('data-tab') ? divContent.getAttribute('data-tab') : 0;

    renderHtml(tabs[index]);
    startAnimation(['show'], ['hide']);
    stopSubmit();
  });

  function setButtonsTabListener() {
    let buttonFirst = document.querySelector('#firstTabButton');
    let buttonSecond = document.querySelector('#secondTabButton');
    buttonFirst.addEventListener('click', event => {
      const tabObj = tabs[0];
      divContent.setAttribute('data-tab', tabObj.index);
      tableDiv.setAttribute('data-tab', tabObj.index);
      startAnimation(['hide'], ['show']);
    });

    buttonSecond.addEventListener('click', event => {
      const tabObj = tabs[1];
      divContent.setAttribute('data-tab', tabObj.index);
      tableDiv.setAttribute('data-tab', tabObj.index);
      startAnimation(['hide'], ['show']);
    });
  }

  setButtonsTabListener();

  function stopSubmit() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    })
  }

  function renderHtml(content) {
    content.formContainer.setAttribute('data-tab', content.index);
    content.formContainer.innerHTML = content.formContent;

    content.tableContainer.setAttribute('data-tab', content.index);
    content.tableContainer.innerHTML = content.tableContent;
    tableLogic();
  }

  function renderTable() {
    let savedData = localStorage.getItem('time_difference');
    if (!savedData) {

    }
  }

  function startAnimation(clAdd, clDel) {
    addClasses(clAdd);
    removeClasses(clDel);
  }

  function addClasses(classes) {
    classes.forEach(el => {
      if (!divContent.classList.contains(el)) {
        divContent.classList.add(el);
      }
      if (!tableDiv.classList.contains(el)) {
        tableDiv.classList.add(el);
      }     
    })
  }

  function removeClasses(classes) {
    classes.forEach(el => {
      if (divContent.classList.contains(el)) {
        divContent.classList.remove(el);
      }
      if (tableDiv.classList.contains(el)) {
        tableDiv.classList.remove(el);
      }
    })
  }

  // renderHtml(tabs[0]);
  startAnimation(['show'], ['hide']);
  
}

main();