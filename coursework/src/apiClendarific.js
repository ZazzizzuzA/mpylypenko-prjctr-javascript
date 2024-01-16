export default function () {
  const API_KEY = 'a79vRIjp0WwPuJjHT04N3cr7CgKF3LEc';
  const urlCountries = 'https://calendarific.com/api/v2/countries';
  const urlHolidays = 'https://calendarific.com/api/v2/holidays';
  let countries = null;
  let holidays = null;


  async function getCountries() {
    if (countries) {
      return countries;
    }
    try {
      let response = await fetch(`${urlCountries}?api_key=${API_KEY}`);

      if (!response.ok) {
        throw new Error('Response for countries is not OK');
      }

      let data = await response.json();
      countries = data.response.countries;
      return countries;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function getHolidays(country, year) {
    if (holidays) {
      return holidays;
    }
    try {
      let response = await fetch(`${urlHolidays}?api_key=${API_KEY}&country=${country}&year=${year}`);

      if (!response.ok) {
        throw new Error('Response for holidays is not OK');
      }

      let data = await response.json();
      holidays = data.response.holidays;
      return holidays;
      
    } catch (err) {
      console.error(err);
      alert(err.message)
    }
  }

  function getStatusCountries() {
    return !!countries;
  }

  function getStatusHolidays() {
    return !!holidays;
  }

  return {
    getCountries,
    countriesGetted: getStatusCountries,
    getHolidays,
    holidaysGetted: getStatusHolidays
  };

}