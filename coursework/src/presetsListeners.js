export default function() {
  let form = null;
  
  let buttonPresetWeek = null;
  let buttonPresetMonth = null;
  
  let startDateInput = null;
  let endDateInput = null;
  let submitButton = null;

  function setListeners() {
    if (buttonPresetWeek) {
      buttonPresetWeek.addEventListener('click', weekCallback);
    }

    if (buttonPresetMonth) {
      buttonPresetMonth.addEventListener('click', monthCallback)
    }
  }

  function removeListeners() {
    if (buttonPresetWeek) {
      buttonPresetWeek.removeEventListener('click', weekCallback);
    }

    if (buttonPresetMonth) {
      buttonPresetMonth.removeEventListener('click', monthCallback);
    }
  }

  function weekCallback(event) {
    event.preventDefault();
    const todayDate = new Date().toISOString().replace(/T.*/, '');
    const dayInMS = new Date(Date.UTC(1970, 0, 2)).getTime();
    const endDate = new Date(new Date().getTime() + dayInMS * 7).toISOString().replace(/T.*/, '');

    startDateInput.value = todayDate
    endDateInput.value = endDate;
    submitButton.click();
  }

  function monthCallback(event) {
    event.preventDefault();
    const todayDate = new Date().toISOString().replace(/T.*/, '');
    const dayInMS = new Date(Date.UTC(1970, 0, 2)).getTime();
    const endDate = new Date(new Date().getTime() + dayInMS * 30).toISOString().replace(/T.*/, '');

    startDateInput.value = todayDate
    endDateInput.value = endDate;
    submitButton.click();
  }

  function findElements() {
    form = document.querySelector('#form');

    if (!form) {
      return false;
    }
    buttonPresetWeek = document.getElementById('presetWeek');
    buttonPresetMonth = document.getElementById('presetMonth');
    
    startDateInput = form.querySelector('#startDate');
    endDateInput = form.querySelector('#endDate');
    submitButton = form.querySelector('#btnSubmit');

    return true;
  }

  return {
    setListeners,
    removeListeners,
    findElements
  }
}