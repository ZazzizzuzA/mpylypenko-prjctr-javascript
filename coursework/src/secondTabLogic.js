export default function(API) {
  const api = API;
  async function renderFunctionality(form) {
    const countriesSelect = form.querySelector('select[name="countries"]');
    const yearsSelect = form.querySelector('select[name="years"]');
  
    let countries = await api.getCountries();
  
    function insertCountriesOptionsHTML() {
      countriesSelect.innerHTML = `<option value="">Оберіть країну</option>`;

      for (let country of countries) {
        const html = `
          <option value="${country['iso-3166']}">${country.country_name}</option>
        `;
        countriesSelect.innerHTML += html;
      }
    }
  
    function insertYearsOptionsHTML() {
      const currentYear = new Date().getUTCFullYear();
      for (let i = 2001; i < 2050; i++) {
        const html = i === currentYear ? `
          <option value="${i}" selected>${i}</option>
        ` : `
          <option value="${i}">${i}</option>
        `;
        yearsSelect.innerHTML += html;
      }
    }
  
    function addListenerToSelectCountries() {
      countriesSelect.addEventListener('change', event => {
        const selectValue = event.target.value;
        console.log(event.target.value);
        if (selectValue == "") {
          yearsSelect.disabled = true;
        } else {
          yearsSelect.disabled = false;
        }
      })
    }
  

  
    insertCountriesOptionsHTML();
    insertYearsOptionsHTML();
    addListenerToSelectCountries();
  
  }

  async function onReadyFormEvent(form) {
    function getParamsFromForm() {
      const countriesSelectValue = form.querySelector('select[name="countries"]').value;
      const yearsSelectValue = form.querySelector('select[name="years"]').value;
      return {
        country: countriesSelectValue,
        year: yearsSelectValue
      }
    }

    async function listOfHolidays({ country, year }) {
      if (!country || !year) {
        alert('Value of COUNTRY or YEAR is not valid');
        return null;
      }

      return await api.getHolidays(country, year);
    }

    let holidaysList = await listOfHolidays(getParamsFromForm());

    return holidaysList;
  }

  return {
    renderFunctionality,
    onReadyFormEvent
  }
}