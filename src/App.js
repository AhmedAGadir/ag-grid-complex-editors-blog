import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { columnDefs, defaultColDef } from './columns';
import GridComponents from './Components';

import { uuid } from 'uuidv4';
import './App.css'


function App() {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const [rowData, setRowData] = useState(null);

  const frameworkComponents = {
    simpleEditor: GridComponents.SimpleEditor,
    asyncValidationEditor: GridComponents.AsyncValidationEditor,
    autoCompleteEditor: GridComponents.AutoCompleteEditor,
    agDateInput: GridComponents.MyDatePicker,
    dateEditor: GridComponents.DateEditor,
    actionsRenderer: GridComponents.ActionsRenderer,
    addRowStatusBar: GridComponents.AddRowStatusBar
  };

  function onGridReady(params) {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    fetch("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(row => row.id = uuid());
        setRowData(data.slice(0, 100));
      });
    params.api.sizeColumnsToFit();
  }

  return (
    <div className="my-app" >
      <div
        id="myGrid"
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          getRowNodeId={data => data.id}
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
          editType="fullRow"
          suppressClickEdit
          floatingFilter
          statusBar={{
            statusPanels: [
              { statusPanel: 'addRowStatusBar' }
            ]
          }}
        />
      </div>
    </div>
  )
}

export default App;
