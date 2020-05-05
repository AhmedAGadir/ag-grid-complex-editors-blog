import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import SimpleEditor from './Components/SimpleEditor';
import ValidationEditor from './Components/ValidationEditor';

import {
  ALL_YEARS,
  ALL_SPORTS,
  ALL_COUNTRIES
} from './lists.js';

import CrudRenderer from './Components/CrudRenderer';
import DropdownEditor from './Components/DropdownEditor';

import MyDatePicker from './Components/MyDatePicker';

function App() {
  const columnDefs = [
    { headerName: 'Athlete (Popup)', field: "athlete", cellEditor: 'agTextCellEditor' },
    // { headerName: "Age (simpleEditor)", field: "age", cellEditor: 'simpleEditor' },
    {
      headerName: "Country (autoComplete)",
      field: "country",
    },
    {
      headerName: "Year (Dropdown)",
      field: "year",
      cellEditor: 'dropdownEditor',
      cellEditorParams: {
        values: ALL_YEARS
      }
    },
    {
      headerName: "Date (Datepicker)",
      field: "date",
      filter: 'agDateColumnFilter',
      filterParams: {
        suppressAndOrCondition: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split('/');
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      },
    },
    {
      headerName: "Sport (Validation)",
      field: "sport",
      cellEditor: 'validationEditor',
      cellEditorParams: {
        condition: (value) => ALL_SPORTS.includes(value)
      }

    },
    // { headerName: "Gold", field: "gold" },
    // { headerName: "Silver", field: "silver" },
    // { headerName: "Bronze", field: "bronze" },
    // { headerName: "Total", field: "total" },
    {
      headerName: 'CRUD',
      colId: 'crud',
      cellRenderer: 'crudRenderer',
      editable: false,
      minWidth: 250
    }
  ];

  const defaultColDef = {
    editable: true,
    filter: true
  };

  const frameworkComponents = {
    simpleEditor: SimpleEditor,
    validationEditor: ValidationEditor,
    crudRenderer: CrudRenderer,
    dropdownEditor: DropdownEditor,
    agDateInput: MyDatePicker
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
        setRowData(data.slice(0, 100));
      });

    setTimeout(() => {
      params.columnApi.autoSizeAllColumns();
    }, 500);
    // params.api.sizeColumnsToFit();
  }

  const onRowEditingStarted = params => {
    let crudRenderer = getCrudRenderer(params.node);
    crudRenderer.startEditing();
  }

  const onRowEditingStopped = params => {
    let crudRenderer = getCrudRenderer(params.node);
    crudRenderer.stopEditing(false);
  }

  const getCrudRenderer = node => {
    return gridApi.getCellRendererInstances({ rowNodes: [node], column: 'crud' })[0].componentInstance;
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
          floatingFilter
        // singleClickEdit
        />
      </div>
    </div>
  )
}

export default App;
