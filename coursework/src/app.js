"use strict";

function main() {
  const tabs = [
    {
      title: '1',
      content: firstTabContent
    },

  ]; 

  function stopSubmit() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    })
  }


  function renderHtml(content) {
    const divContent = document.querySelector('#content');
    divContent.innerHTML = content.content;
    stopSubmit();
  }

  renderHtml(tabs[0]);

  
}

main();