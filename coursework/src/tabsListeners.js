export default function (tabsInfo) {
  let buttonFirst = document.querySelector('#firstTabButton');
  let buttonSecond = document.querySelector('#secondTabButton');
  buttonFirst.addEventListener('click', event => {
    const tabObj = tabsInfo[0];
    tabObj.formContainer.setAttribute('data-tab', tabObj.index);
    tabObj.tableContainer.setAttribute('data-tab', tabObj.index);
    startAnimation(['hide'], ['show'], tabObj.index);
  });

  buttonSecond.addEventListener('click', async event => {
    const tabObj = tabsInfo[1];
    tabObj.formContainer.setAttribute('data-tab', tabObj.index);
    tabObj.tableContainer.setAttribute('data-tab', tabObj.index);
    startAnimation(['hide'], ['show'], tabObj.index);
  });

  function startAnimation(clAdd, clDel, index) {
    addClasses(clAdd, index);
    removeClasses(clDel, index);
  }

  function addClasses(classes, index) {
    classes.forEach(el => {
      if (!tabsInfo[index].formContainer.classList.contains(el)) {
        tabsInfo[index].formContainer.classList.add(el);
      }
      if (!tabsInfo[index].tableContainer.classList.contains(el)) {
        tabsInfo[index].tableContainer.classList.add(el);
      }
    })
  }

  function removeClasses(classes, index) {
    classes.forEach(el => {
      if (tabsInfo[index].formContainer.classList.contains(el)) {
        tabsInfo[index].formContainer.classList.remove(el);
      }
      if (tabsInfo[index].tableContainer.classList.contains(el)) {
        tabsInfo[index].tableContainer.classList.remove(el);
      }
    })
  }
  
  // startAnimation(['show'], ['hide']);

  return {
    startAnimation
  }

}