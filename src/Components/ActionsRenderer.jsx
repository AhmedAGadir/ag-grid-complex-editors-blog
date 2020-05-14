import React, { Component } from 'react';
// import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
    margin: '0 10px',
    width: 80
});

// export default (props) => {
//     let [editing, setEditing] = useState(false);
//     let [disabled, setDisabled] = useState(false);

//     useEffect(() => {
//         let editingCells = props.api.getEditingCells();
//         if (editingCells.length !== 0) {
//             setDisabled(true);
//         }

//         function onRowEditingStarted(params) {
//             if (props.node === params.node) {
//                 startEditing();
//             } else {
//                 setDisabled(true);
//             }
//         };

//         function onRowEditingStopped(params) {
//             if (props.node === params.node) {
//                 stopEditing();
//             } else {
//                 setDisabled(false);
//             }
//         }

//         props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
//         props.api.addEventListener('rowEditingStopped', onRowEditingStopped);

//         return () => {
//             props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
//             props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
//         };
//     }, []);


//     function startEditing() {
//         console.log('startediting', editing);
//         if (!editing) {
//             console.log('acc start editing')
//             props.api.startEditingCell({
//                 rowIndex: props.rowIndex,
//                 colKey: props.column.colId
//             });
//             setEditing(true);
//         }
//     }

//     function stopEditing(bool) {
//         console.log('stopediting', editing)
//         if (editing) {
//             console.log('acc stop editing')
//             props.api.stopEditing(bool);
//             setEditing(false);
//         }
//     }

//     function deleteRow(force = false) {
//         let data = props.data;
//         let confirm = true;
//         if (!force) {
//             confirm = window.confirm(`are you sure you want to delete this row: ${JSON.stringify(data)})`)
//         }
//         if (confirm) {
//             props.api.updateRowData({ remove: [data] });
//             // weird bug if you don't redraw
//             props.api.redrawRows();
//         }
//     };

//     return (
//         <div>
//             {editing
//                 ? <>
//                     <MyButton
//                         color="primary"
//                         variant="contained"
//                         onClick={() => stopEditing(false)}
//                         disabled={disabled}>Update</MyButton>
//                     <MyButton
//                         color="secondary"
//                         variant="contained"
//                         onClick={() => stopEditing(true)}
//                         disabled={disabled}>Cancel</MyButton>
//                 </>
//                 : <>
//                     <MyButton
//                         color="primary"
//                         variant="outlined"
//                         onClick={startEditing}
//                         disabled={disabled}>Edit</MyButton>
//                     <MyButton
//                         color="primary"
//                         variant="outlined"
//                         onClick={() => deleteRow()}
//                         disabled={disabled}>Delete</MyButton>
//                 </>
//             }
//         </div>
//     )
// }

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            disabled: false
        };
    }

    componentDidMount() {
        let editingCells = this.props.api.getEditingCells();
        if (editingCells.length !== 0) {
            this.setState({ disabled: true });
        }

        this.props.api.addEventListener('rowEditingStarted', this.onRowEditingStarted);
        this.props.api.addEventListener('rowEditingStopped', this.onRowEditingStopped);
    }

    destroy() {
        this.props.api.removeEventListener('rowEditingStarted', this.onRowEditingStarted);
        this.props.api.removeEventListener('rowEditingStopped', this.onRowEditingStopped);
    }

    onRowEditingStarted = params => {
        if (this.props.node === params.node) {
            this.startEditing()
        } else {
            this.setState({ disabled: true });
        }
    }

    onRowEditingStopped = params => {
        if (this.props.node === params.node) {
            if (this.isEmptyRow(params.data)) {
                this.deleteRow(true);
            } else {
                this.stopEditing();
            }
        } else {
            this.setState({ disabled: false });
        }
    }

    isEmptyRow = (data) => {
        return !Object.values(data).some(value => value);
    }

    startEditing = () => {
        if (!this.state.editing) {
            this.props.api.startEditingCell({
                rowIndex: this.props.rowIndex,
                colKey: this.props.column.colId
            });
            this.setState({ editing: true });
        }
    }

    stopEditing = (bool) => {
        if (this.state.editing) {
            this.props.api.stopEditing(bool);
            this.setState({ editing: false });
        }
    }

    deleteRow = (force = false) => {
        let data = this.props.data;
        let confirm = true;
        if (!force) {
            confirm = window.confirm(`are you sure you want to delete this row: ${JSON.stringify(data)})`)
        }
        if (confirm) {
            this.props.api.updateRowData({ remove: [data] });
            // weird bug if you don't redraw
            this.props.api.redrawRows();
        }
    }

    render() {
        const startEditingButtons = (
            <>
                <MyButton
                    color="primary"
                    variant="outlined"
                    onClick={this.startEditing}
                    disabled={this.state.disabled}>Edit</MyButton>
                <MyButton
                    color="primary"
                    variant="outlined"
                    onClick={() => this.deleteRow()}
                    disabled={this.state.disabled}>Delete</MyButton>
            </>
        );

        const stopEditingButtons = (
            <>
                <MyButton
                    color="primary"
                    variant="contained"
                    onClick={() => this.stopEditing(false)}
                    disabled={this.state.disabled}>Update</MyButton>
                <MyButton
                    color="secondary"
                    variant="contained"
                    onClick={() => this.stopEditing(true)}
                    disabled={this.state.disabled}>Cancel</MyButton>
            </>
        );
        return (
            <div>
                {this.state.editing ? stopEditingButtons : startEditingButtons}
            </div>
        )

    }
}