import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css'

import SimpleEditor from './Components/SimpleEditor';
import AsyncValidationEditor from './Components/AsyncValidationEditor';
import AutoCompleteEditor from './Components/AutoCompleteEditor';
import MyDatePicker from './Components/MyDatePicker';
import DateEditor from './Components/DateEditor';
import ActionsRenderer from './Components/ActionsRenderer';
import AddRowStatusBar from './Components/AddRowStatusBar';

import { ALL_SPORTS, ALL_COUNTRIES } from './lists.js';

import { uuid } from 'uuidv4';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
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
        {
          headerName: "Country (autoComplete)",
          field: "country",
          cellEditor: 'autoCompleteEditor',
          cellEditorParams: {
            options: ALL_COUNTRIES
          },
        },
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
        {
          headerName: '',
          colId: 'actions',
          cellRenderer: 'actionsRenderer',
          editable: false,
          filter: false,
          minWidth: 200
        }
      ],
      defaultColDef: {
        editable: true,
        filter: true,
        suppressKeyboardEvent: params => params.editing,
      },
      frameworkComponents: {
        simpleEditor: SimpleEditor,
        asyncValidationEditor: AsyncValidationEditor,
        autoCompleteEditor: AutoCompleteEditor,
        agDateInput: MyDatePicker,
        dateEditor: DateEditor,
        actionsRenderer: ActionsRenderer,
        addRowStatusBar: AddRowStatusBar
      },
      statusBar: {
        statusPanels: [
          { statusPanel: 'addRowStatusBar' }
        ]
      },
      rowData: null,
    }
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    fetch("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(row => row.id = uuid());
        this.setState({ rowData: data.slice(100, 120) });
      });

    params.api.sizeColumnsToFit();
  }

  render() {
    return (
      <div className="my-app" >
        <div
          id="myGrid"
          style={{ height: "100%", width: "100%" }}
          className="ag-theme-alpine">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            frameworkComponents={this.state.frameworkComponents}
            rowData={this.state.rowData}
            getRowNodeId={data => data.id}
            onGridReady={this.onGridReady}
            editType="fullRow"
            floatingFilter
            statusBar={this.state.statusBar}
          />
        </div>
      </div>
    )
  }
}

export default App;
