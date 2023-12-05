"use strict";

function GetButton() {
  return document.querySelector('button');
}

let button = GetButton();

function AddListenerOnClick(element, callback) {
  element.addEventListener('click', callback)
}

function callbackForClick(event) {
  let target = event.target;
  let turnAttr = target.getAttribute('turn');
  if (!turnAttr) {
    target.setAttribute('turn', 'on');
    turnAttr = 'on';
  }
  turnAttr = changeTextOfButton(target, turnAttr);
  changeBackgroundColor(turnAttr);

  SetFormatedDateOfOutput(turnAttr);
}

function changeTextOfButton(target, turnAttr) {
  if (turnAttr === 'off') {
    target.textContent = 'Turn off';
    target.setAttribute('turn', 'on');
    turnAttr = 'on';
  } else if (turnAttr === 'on') {
    target.textContent = 'Turn on';
    target.setAttribute('turn', 'off');
    turnAttr = 'off';
  }

  return turnAttr;
}

function changeBackgroundColor(status) {
  const body = document.body;  
  if (status === 'off') {
    body.classList.remove('turn-on-bg');
    body.classList.add('turn-off-bg');    
  }
  if (status === 'on') {
    body.classList.remove('turn-off-bg');
    body.classList.add('turn-on-bg');    
  }
}

function GetSpan() {
  return document.querySelector('#lastOutputDate');
}

function SetFormatedDateOfOutput(status) {
  let date = new Date().toISOString().replace('T', ' ').replace(/\..*$/, '');

  let span = GetSpan();

  if (status === 'off') {
    span.textContent = 'Last turn off: ' + date;
  }
  if (status === 'on') {
    span.textContent = 'Last turn on: ' + date;
  }

  let dataToStorage = {
    status,
    message: span.textContent
  }
  saveToStorage('turn_message', JSON.stringify(dataToStorage));
}

function saveToStorage(name, date) {
  localStorage.setItem(name, date);
}

function getFromStorage(name) {
  try {
    let storageData = localStorage.getItem(name);

    if (!storageData) {
      return {
        status: 'on',
        message: 'Didn\'t use for now'
      };
    }
  
    return JSON.parse(storageData);
  } catch(err) {
    return {
      status: 'on',
      message: 'Didn\'t use for now'
    };
  }

}

function setDateToSpan(storageData) {
  let span = GetSpan();
  span.textContent = storageData.message;
}

function setLastCondition() {
  let storageData = getFromStorage('turn_message');
  const body = document.body;
  button.setAttribute('turn', storageData.status);
  if (storageData.status === 'off') {
    button.textContent = 'Turn on';
    body.classList.remove('turn-on-bg');
    body.classList.add('turn-off-bg');    
  }
  if (storageData.status === 'on') {
    button.textContent = 'Turn off';
    body.classList.remove('turn-off-bg');
    body.classList.add('turn-on-bg');    
  }
  setDateToSpan(storageData)
}

setLastCondition();

AddListenerOnClick(button, callbackForClick);