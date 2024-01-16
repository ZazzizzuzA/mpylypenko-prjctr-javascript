export default `
<div>
  <h1>Таблиця з результатами для другої таби</h1>
  <div id="tableWrapper">
    <div class="container mt-3">
    <table id="resultTable" class="resizable-table table table-hover">
      <thead>
        <tr id="header-row">
          <th class="draggable-table" id="columnToSort" data-column="0" data-sorted="desc"><span style='font-size: 18px;'>&#8679;</span>  Дата</th>
          <th class="draggable-table" data-column="1">Назва свята</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    </div>
  </div>
</div>
`;