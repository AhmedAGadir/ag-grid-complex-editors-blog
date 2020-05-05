import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import SimpleEditor from './Components/SimpleEditor';

function App() {
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Athelete (agTextCellEditor)', field: "athlete", cellEditor: 'agTextCellEditor' },
    { headerName: "Age (simpleEditor)", field: "age", cellEditor: 'simpleEditor' },
    { headerName: "Country", field: "country" },
    { headerName: "Year", field: "year" },
    { headerName: "Date", field: "date" },
    { headerName: "Sport", field: "sport" },
    { headerName: "Gold", field: "gold" },
    { headerName: "Silver", field: "silver" },
    { headerName: "Bronze", field: "bronze" },
    { headerName: "Total", field: "total" }
  ]);

  const [defaultColDef, setDefaultColDef] = useState({
    editable: true,

  });

  const [frameworkComponents, setFrameworkComponents] = useState({
    simpleEditor: SimpleEditor
  })

  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const onGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    fetch("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json")
      .then(res => res.json())
      .then(data => {
        setRowData(data);
      });

    params.columnApi.autoSizeAllColumns();
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        id="myGrid"
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          frameworkComponents={frameworkComponents}
          rowData={rowData}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}

export default App;
