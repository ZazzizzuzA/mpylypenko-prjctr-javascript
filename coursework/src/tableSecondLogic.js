export default function() {

  function GetTable() {
    return document.querySelector('#resultTable');
  }

  function insertRows(data) {
    const table = GetTable();
    const tBody = table.querySelector('tbody');
    
    if (!data || !data.length) {
      alert('No holidays in this country');
      return;
    }

    for (let rowData of data) {
      let html = `
        <tr class="table-row">
          <td class="date-cell">${rowData.date.iso.replace(/T.*/, '')}</td>
          <td class="result-cell">${rowData.name}</td>
        </tr>
      `;

      tBody.innerHTML += html;
    }
  }

  return {
    insertRows
  }
}