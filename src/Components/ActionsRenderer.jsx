import React, { useState, useEffect } from 'react';
import './ActionsRenderer.css';


export default (props) => {
    let [editing, setEditing] = useState(false);
    let [disabled, setDisabled] = useState(false);

    useEffect(() => {
        let editingCells = props.api.getEditingCells();
        if (editingCells.length !== 0) {
            setDisabled(true);
        }

        props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
        props.api.addEventListener('rowEditingStopped', onRowEditingStopped);

        return () => {
            props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
            props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
        };
    }, []);

    function onRowEditingStarted(params) {
        if (props.node === params.node) {
            setEditing(true);
        } else {
            setDisabled(true);
        }
    };

    function onRowEditingStopped(params) {
        if (props.node === params.node) {
            if (isEmptyRow(params.data)) {
                deleteRow(true);
            } else {
                setEditing(false);
            }
        } else {
            setDisabled(false);
        }
    }

    function startEditing() {
        props.api.startEditingCell({
            rowIndex: props.rowIndex,
            colKey: props.column.colId
        });
    }

    function stopEditing(bool) {
        props.api.stopEditing(bool);
    }

    function deleteRow(force = false) {
        let data = props.data;
        let confirm = true;
        if (!force) {
            confirm = window.confirm(`are you sure you want to delete this row: ${JSON.stringify(data)})`)
        }
        if (confirm) {
            props.api.updateRowData({ remove: [data] });
            props.api.refreshCells({ force: true });
        }
    };

    function isEmptyRow(data) {
        let dataCopy = { ...data };
        delete dataCopy.id;
        return !Object.values(dataCopy).some(value => value);
    }

    return (
        <div>
            {editing
                ? <>
                    <button
                        color="primary"
                        variant="contained"
                        onClick={() => stopEditing(false)}
                        disabled={disabled}>Update</button>
                    <button
                        color="secondary"
                        variant="contained"
                        onClick={() => stopEditing(true)}
                        disabled={disabled}>Cancel</button>
                </>
                : <>
                    <button
                        color="primary"
                        variant="outlined"
                        onClick={startEditing}
                        disabled={disabled}>Edit</button>
                    <button
                        color="secondary"
                        variant="outlined"
                        onClick={() => deleteRow()}
                        disabled={disabled}>Delete</button>
                </>
            }
        </div>
    )
}







// import React, { Component } from 'react';
// import './ActionsRenderer.css';




// export default class extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             editing: false,
//             disabled: false
//         };
//     }

//     componentWillMount() {
//         let editingCells = this.props.api.getEditingCells();
//         if (editingCells.length !== 0) {
//             this.setState({ disabled: true });
//         }
//     }

//     componentDidMount() {
//         this.props.api.addEventListener('rowEditingStarted', this.onRowEditingStarted);
//         this.props.api.addEventListener('rowEditingStopped', this.onRowEditingStopped);
//     }

//     destroy() {
//         this.props.api.removeEventListener('rowEditingStarted', this.onRowEditingStarted);
//         this.props.api.removeEventListener('rowEditingStopped', this.onRowEditingStopped);
//     }

//     onRowEditingStarted = params => {
//         if (this.props.node === params.node) {
//             this.setState({ editing: true });
//         } else {
//             this.setState({ disabled: true });
//         }
//     }

//     onRowEditingStopped = params => {
//         if (this.props.node === params.node) {
//             if (this.isEmptyRow(params.data)) {
//                 this.deleteRow(true);
//             } else {
//                 this.setState({ editing: false });
//             }
//         } else {
//             this.setState({ disabled: false });
//         }
//     }

//     startEditing = () => {
//         this.props.api.startEditingCell({
//             rowIndex: this.props.rowIndex,
//             colKey: this.props.column.colId
//         });
//     }

//     stopEditing = (bool) => {
//         this.props.api.stopEditing(bool);
//     }

//     deleteRow = (force = false) => {
//         let data = this.props.data;
//         let confirm = true;
//         if (!force) {
//             confirm = window.confirm(`are you sure you want to delete this row: ${JSON.stringify(data)})`)
//         }
//         if (confirm) {
//             this.props.api.updateRowData({ remove: [data] });
//             this.props.api.refreshCells({ force: true });
//         }
//     }

//     isEmptyRow = (data) => {
//         let dataCopy = { ...data };
//         delete dataCopy.id;
//         return !Object.values(dataCopy).some(value => value);
//     }

//     render() {
//         const startEditingButtons = (
//             <>
//                 <button
//                     variant="outlined"
//                     color="primary"
//                     onClick={this.startEditing}
//                     disabled={this.state.disabled}>Edit</button>
//                 <button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => this.deleteRow()}
//                     disabled={this.state.disabled}>Delete</button>
//             </>
//         );

//         const stopEditingButtons = (
//             <>
//                 <button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => this.stopEditing(false)}
//                     disabled={this.state.disabled}>Update</button>
//                 <button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => this.stopEditing(true)}
//                     disabled={this.state.disabled}>Cancel</button>
//             </>
//         );
//         return (
//             <div className="actions-btn-container">
//                 {this.state.editing ? stopEditingButtons : startEditingButtons}
//             </div>
//         )

//     }
// }