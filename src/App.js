import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import SimpleEditor from './Components/SimpleEditor';
import ValidationEditor from './Components/ValidationEditor';

import { ALL_COUNTRIES, ALL_YEARS } from './lists.js';

import CrudRenderer from './Components/CrudRenderer';
import DropdownEditor from './Components/DropdownEditor';

function App() {
  const columnDefs = [
    { headerName: 'Athlete (agTextCellEditor)', field: "athlete", cellEditor: 'agTextCellEditor' },
    { headerName: "Age (simpleEditor)", field: "age", cellEditor: 'simpleEditor' },
    {
      headerName: "Country (validationEditor)",
      field: "country",
      cellEditor: 'validationEditor',
      cellEditorParams: {
        condition: (value) => ALL_COUNTRIES.includes(value)
      }
    },
    {
      headerName: "Year (Dropdown)",
      field: "year",
      minWidth: 200,
      cellEditor: 'dropdownEditor',
      cellEditorParams: {
        values: ALL_YEARS
      }
    },
    { headerName: "Date (Datepicker)", field: "date" },
    { headerName: "Sport (Modal)", field: "sport" },
    // { headerName: "Gold", field: "gold" },
    // { headerName: "Silver", field: "silver" },
    // { headerName: "Bronze", field: "bronze" },
    // { headerName: "Total", field: "total" },
    {
      headerName: 'Edit',
      colId: 'edit',
      cellRenderer: 'crudRenderer',
      editable: false,
      minWidth: 200
    }
  ];

  const defaultColDef = {
    editable: true,
  };

  const frameworkComponents = {
    simpleEditor: SimpleEditor,
    validationEditor: ValidationEditor,
    crudRenderer: CrudRenderer,
    dropdownEditor: DropdownEditor
  };

  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const onGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    fetch("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json")
      .then(res => res.json())
      .then(data => {
        setRowData(data.slice(0, 5));
      });

    params.columnApi.autoSizeAllColumns();
    // params.api.sizeColumnsToFit();
  }

  const onRowEditingStarted = params => {
    let editRenderer = getEditRenderer(params.node);
    editRenderer.startEditing();
  }

  const onRowEditingStopped = params => {
    let editRenderer = getEditRenderer(params.node);
    editRenderer.stopEditing(false);
  }

  const getEditRenderer = node => {
    return gridApi.getCellRendererInstances({ rowNodes: [node], column: 'edit' })[0].componentInstance;
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
          editType="fullRow"
          onRowEditingStarted={onRowEditingStarted}
          onRowEditingStopped={onRowEditingStopped}
        // singleClickEdit
        />
      </div>
    </div>
  )
}

export default App;
