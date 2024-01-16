export default function (data) {
  const table = document.querySelector('#resultTable');

  function buildHTMLRow(rowData) {
    const type = getTypeOfCounting(rowData);
    const content = `
      <tr class="table-row">
        <td class="start-date-cell">${typeof rowData.startDate === 'string' ? new Date(rowData.startDate).toLocaleDateString().replace(/,.*$/, '') : rowData.startDate.toLocaleDateString().replace(/,.*$/, '')}</td>
        <td class="end-date-cell">${typeof rowData.endDate === 'string' ? new Date(rowData.endDate).toLocaleDateString().replace(/,.*$/, '') : rowData.endDate.toLocaleDateString().replace(/,.*$/, '')}</td>
        <td class="type-cell">${type}</td>
        <td class="result-cell">${rowData.result}</td>
      </tr>
    `;
    return content;
  }

  function insertRow(row) {
    const tableRowsWrapper = table.querySelector('tbody');
    tableRowsWrapper.innerHTML += row;
  };

  function getTypeOfCounting(rowData) {
    const howCounted = rowData.howCounted;
    const whatCounted = rowData.whatCounted;
    const possibleCounters = {
      'hours': 'Години', 
      'days': 'Дні', 
      'seconds': 'Секунди',
      'minutes': 'Хвилини'
    };

    let typeOfCounting = '';
    switch (true) {
      case whatCounted === 'works':
        typeOfCounting = `${possibleCounters[howCounted]} робочих днів`;
        break;

      case whatCounted === 'weekends':
        typeOfCounting = `${possibleCounters[howCounted]} Вихідних`;
        break;

      default:
        typeOfCounting = `${possibleCounters[howCounted]} всіх днів`;
        break;
    }
    return typeOfCounting;

  }

  insertRow(buildHTMLRow(data));
}