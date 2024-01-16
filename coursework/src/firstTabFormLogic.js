export default function(form) {
  const startDateInput = form.querySelector('#startDate');
  const endDateInput = form.querySelector('#endDate');
  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;

  const whatCountInput = Array.from(form.querySelectorAll('input[name="option1"]')).filter(el => el.checked)[0];
  const howToCountInput = Array.from(form.querySelectorAll('input[name="option2"]')).filter(el => el.checked)[0];
  const whatCountValue = whatCountInput.value;
  const howToCountValue = howToCountInput.value;

  if (!startDateValue || !endDateValue) {
    alert('Period is invalid. Please, select start and end date of period.');
    return false;
  }

  function formatInputValuesToDate() {
    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);
    const dayInMS = new Date(Date.UTC(1970, 0, 2)).getTime();
    return {
      options: {
        whatToCount: whatCountValue,
        howToCount: howToCountValue
      },
      startDateValues: {
        time: startDate.getTime(),
        dateObj: startDate
      },
      endDateValues: {
        time: endDate.getTime(),
        dateObj: endDate,
      }
    }
  }

  function MethodsToCountDays(datesObject) {
    const dates = datesObject.filteredDays;
    const whatToCount = datesObject.options.whatToCount;
    const howToCount = datesObject.options.howToCount;
    const startDate = datesObject.startDateValues.dateObj;
    const endDate = datesObject.endDateValues.dateObj;

    const methods = {
      days: function() {
        return {
          startDate: startDate,
          endDate: endDate,
          result: dates.length - 1,
          whatCounted: whatToCount,
          howCounted: howToCount
        };
      },
  
      seconds: function() {
        const secondsInDay = 86400;
        const resultSeconds = secondsInDay * dates.length;
        return {
          startDate: startDate,
          endDate: endDate,
          result: resultSeconds - secondsInDay,
          whatCounted: whatToCount,
          howCounted: howToCount
        };
      }, 
  
      minutes: function() {
        const minuteInDay = 1440;
        return {
          startDate: startDate,
          endDate: endDate,
          result: minuteInDay * (dates.length - 1),
          whatCounted: whatToCount,
          howCounted: howToCount
        };
      },
  
      hours: function() {
        const hourInDay = 24;
        return {
          startDate: startDate,
          endDate: endDate,
          result: hourInDay * (dates.length - 1),
          whatCounted: whatToCount,
          howCounted: howToCount
        };
      }
    }
    return methods;
  }

  function GetDaysArray(datesObj) {
    const type = datesObj.options.whatToCount;
    const dayInMS = new Date(Date.UTC(1970, 0, 2)).getTime();
    const allDays = parseInt(((datesObj.endDateValues.time - datesObj.startDateValues.time) / dayInMS).toFixed());
    let arrDays = allDays > 0 ? new Array(allDays) : new Array(allDays * -1);
    let start = allDays > 0 ? datesObj.startDateValues.dateObj : datesObj.endDateValues.dateObj;
    arrDays[0] = start;

    let tempDate = start;
    for (let i = 0; i < allDays + 1; i++) {
      let date = arrDays[i];
      if (!!date) {
        continue;
      }

      tempDate = new Date(tempDate.getTime() + dayInMS);
      arrDays[i] = tempDate;
    }

    datesObj.filteredDays = arrDays;

    if (type === 'all') {
      return datesObj;
    }

    datesObj.filteredDays = arrDays.filter(el => {
      if (type === 'works') {
        return el.getDay() > 0 && el.getDay() < 6;
      } else if (type === 'weekends') {
        return el.getDay() === 0 || el.getDay() === 6;
      }
    });

    return datesObj;
  }

  const datesObj = formatInputValuesToDate();
  const datesToCount = GetDaysArray(datesObj);
  return MethodsToCountDays(datesToCount)[howToCountValue]();
}