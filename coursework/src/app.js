"use strict";

import firstTabContent from './firstTabContent.js';
import secondTabContent from './secondTabContent.js';
import tableLogic from './tableLogic.js';
import tableFirstContent from './tableFirstContent.js';
import tableSecondContent from './tableSecondContent.js';
import firstTabFormLogic from './firstTabFormLogic.js';
import tableFirstLogic from './tableFirstLogic.js';
import storageService from './storageService.js';
import presetsListeners from './presetsListeners.js';
import apiClendarific from './apiClendarific.js';
import secondTabLogic from './secondTabLogic.js';
import tableSecondLogic from './tableSecondLogic.js';
import tabsListeners from './tabsListeners.js';


function main() {
  const divContent = document.querySelector('#contentFormResult');
  const tableDiv = document.querySelector('#contentTable');
  const storageMethods = storageService();
  const presetsService = presetsListeners();
  let apiClendarificService = apiClendarific();
  const secondTabService = secondTabLogic(apiClendarificService);
  const tableSecondService = tableSecondLogic();

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

  const { startAnimation } = tabsListeners(tabs);

  divContent.addEventListener('transitionend', event => {
    if (event.target !== divContent) {
      return;
    }

    const index = divContent.hasAttribute('data-tab') ? divContent.getAttribute('data-tab') : 0;
    renderHtml(tabs[index]);

    if (index === '1') {
      secondTabService.renderFunctionality(event.target)
    }
  
    startAnimation(['show'], ['hide'], index);
    stopSubmit();
  });

  function stopSubmit() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const tabId = divContent.getAttribute('data-tab');
      let result = null;

      if (tabId === '0') {
        result = firstTabFormLogic(event.target);
        if (!result) {
          return;
        }
        tableFirstLogic(result);
      } else if (tabId === '1') {

        result = await secondTabService.onReadyFormEvent(event.target);

        if (!result) {
          return;
        }

        tableSecondService.insertRows(result);
      }
      storageMethods.saveToStorage(result, tabId);

    });
  }

  function renderHtml(content) {
    if (presetsService.findElements()) {
      presetsService.removeListeners();
    }

    content.formContainer.setAttribute('data-tab', content.index);
    content.formContainer.innerHTML = content.formContent;

    content.tableContainer.setAttribute('data-tab', content.index);
    content.tableContainer.innerHTML = content.tableContent;

    if (presetsService.findElements()) {
      presetsService.setListeners();
    }

    let storageData = GetStorageData(content.index);
    tableLogic();
    if (storageData) {
      if (content.index === 0) {
        storageData.forEach(el => tableFirstLogic(el));
      }
    }
  }

  function GetStorageData(index) {
    const data = storageMethods.getDataFromStorage(index);
    return data;
  }

  startAnimation(['show'], ['hide'], 0);

}

main();