export default function() {

  function saveToStorage(data, tabId) {
    const name = getName(tabId);
    let savedData = getDataFromStorage(tabId);

    if (!savedData) {
      localStorage.setItem(name, JSON.stringify([data]));
      return true;
    }

    savedData.push(data);
    if (savedData.length > 10) {
      savedData.splice(0, savedData.length - 10);
    }
    let newData = JSON.stringify(savedData)
    localStorage.setItem(name, newData);    
  }

  function getName(tabId) {
    return `prjstr-dates-${tabId}`;
  }

  function getDataFromStorage(tabId) {
    const name = getName(tabId);
    return JSON.parse(localStorage.getItem(name));
  }

  function clearLocalStorage(tabId) {
    let savedData = getDataFromStorage(tabId);
  }


  return {
    saveToStorage,
    getName,
    getDataFromStorage,
    clearLocalStorage
  }
}