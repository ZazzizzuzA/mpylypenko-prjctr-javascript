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
  saveToStorage('turn_message', span.textContent);
}

function saveToStorage(name, date) {
  localStorage.setItem(name, date);
}

function getFromStorage(name) {
  let storageData = localStorage.getItem(name);

  if (!storageData) {
    return '';
  }

  return storageData;
}

function setDateToSpan() {
  let span = GetSpan();
  let storageData = getFromStorage('turn_message');
  span.textContent = storageData;
}

setDateToSpan();

AddListenerOnClick(button, callbackForClick);