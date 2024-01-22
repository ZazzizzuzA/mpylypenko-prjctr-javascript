export default function() {

  function GetTable() {
    return document.querySelector('#resultTable');
  }

  function insertRows(data) {
    const table = GetTable();
    let preparedData = prepareData(data);
    renderIntoTable(table, preparedData);
    addSortingToColumn(table, data);
  }

  function prepareData(data) {
    if (!data || !data.length) {
      alert('No holidays in this country');
      return;
    }

    let htmlData = '';

    for (let rowData of data) {
      let html = `
        <tr class="table-row">
          <td class="date-cell">${rowData.date.iso.replace(/T.*/, '')}</td>
          <td class="result-cell">${rowData.name}</td>
        </tr>
      `;

      htmlData += html;
    }
    return htmlData;
  }

  function renderIntoTable(table, data) {
    const tBody = table.querySelector('tbody');
    tBody.innerHTML = data;
  }

  function addSortingToColumn(table, data) {
    const sortingColumnHeader = table.querySelector('#columnToSort');
    sortingColumnHeader.addEventListener('click', event => {
      if (!data) {
        return null;
      }
      let preparedData = prepareData(data.reverse());
      renderIntoTable(table, preparedData);
      sortingColumnHeader.dataset.sorted = sortingColumnHeader.dataset.sorted === 'asc' ? 'desc' : 'asc';
      let spanIcon = sortingColumnHeader.querySelector('span');
      spanIcon.innerHTML = sortingColumnHeader.dataset.sorted === 'asc' ? '&#8679;' : '&#8681;';
    });
    
  }

  return {
    insertRows
  }
}