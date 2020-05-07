import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import SimpleEditor from './Components/SimpleEditor';
import ValidationEditor from './Components/ValidationEditor';
import DateEditor from './Components/DateEditor';

import './App.css'

import {
  ALL_SPORTS,
  ALL_COUNTRIES
} from './lists.js';

import CrudRenderer from './Components/CrudRenderer';

import MyDatePicker from './Components/MyDatePicker';
import AutoCompleteEditor from './Components/AutoCompleteEditor';

import AsyncValidationEditor from './Components/AsyncValidationEditor';


function App() {
  const columnDefs = [
    {
      headerName: 'Athlete (simpleEditor)',
      field: "athlete",
      cellEditor: 'simpleEditor',
    },
    {
      headerName: "Sport (Validation)",
      field: "sport",
      cellEditor: 'asyncValidationEditor',
      cellEditorParams: {
        condition: (value) => ALL_SPORTS.includes(value)
      }
    },
    // { headerName: "Age (simpleEditor)", field: "age", cellEditor: 'simpleEditor' },
    {
      headerName: "Country (autoComplete)",
      field: "country",
      cellEditor: 'autoCompleteEditor',
      cellEditorParams: {
        options: ALL_COUNTRIES
      },
      suppressKeyboardEvent: params => {
        (console.log('suppressing'))
        return params.editing;
      }
    },
    // {
    //   headerName: "Year",
    //   field: "year",
    // },
    {
      headerName: "Date (Datepicker)",
      field: "date",
      cellEditor: 'dateEditor',
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
    // { headerName: "Gold", field: "gold" },
    // { headerName: "Silver", field: "silver" },
    // { headerName: "Bronze", field: "bronze" },
    // { headerName: "Total", field: "total" },
    {
      headerName: 'CRUD',
      colId: 'crud',
      cellRenderer: 'crudRenderer',
      editable: false,
      filter: false,
      singleClickEdit: false,
      minWidth: 250
    }
  ];

  const defaultColDef = {
    editable: true,
    filter: true,
    singleClickEdit: true,
  };

  const frameworkComponents = {
    simpleEditor: SimpleEditor,
    validationEditor: ValidationEditor,
    crudRenderer: CrudRenderer,
    agDateInput: MyDatePicker,
    autoCompleteEditor: AutoCompleteEditor,
    dateEditor: DateEditor,
    asyncValidationEditor: AsyncValidationEditor
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
        setRowData(data.slice(0, 50));
      });

    setTimeout(() => {
      // params.columnApi.autoSizeAllColumns();
    }, 500);
    params.api.sizeColumnsToFit();
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
          // onRowEditingStarted={onRowEditingStarted}
          // onRowEditingStopped={onRowEditingStopped}
          floatingFilter
          suppressColumnVirtualisation
        // singleClickEdit
        />
      </div>
    </div>
  )
}

export default App;
