import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

import './AddRowStatusBar.css'

export default (props) => {
    let [editing, setEditing] = useState(false);
    let [id, setId] = useState(null);

    useEffect(() => {
        props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
        props.api.addEventListener('rowEditingStopped', onRowEditingStopped);

        return () => {
            props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
            props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
        };
    }, []);

    function onRowEditingStarted() {
        setEditing(true);
    };

    function onRowEditingStopped() {
        setEditing(false);
        setId(null);
    }

    function addRow() {
        setId(uuid());
        let blankRow = { id };
        props.api.updateRowData({ add: [blankRow] });
        let node = props.api.getRowNode(id);
        props.api.ensureIndexVisible(node.rowIndex);

        setTimeout(() => {
            props.api.startEditingCell({
                rowIndex: node.rowIndex,
                colKey: 'athlete'
            });
        }, 300);
    }

    return (
        <div className="add-btn-container">
            <button
                variant={editing ? 'outlined' : 'contained'}
                color="primary"
                onClick={addRow}
                disabled={editing}>Add Row</button>
        </div>
    )
}





// import React, { Component } from 'react';
// import { uuid } from 'uuidv4';

// import './AddRowStatusBar.css'

// export default class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             editing: false
//         };
//         this.id = null;
//     }


//     componentDidMount() {
//         this.props.api.addEventListener('rowEditingStarted', () => {
//             this.setState({ editing: true });
//         });
//         this.props.api.addEventListener('rowEditingStopped', () => {
//             this.id = null;
//             this.setState({ editing: false });
//         });
//     }

//     addRow = () => {
//         this.id = uuid();
//         let blankRow = { id: this.id };
//         this.props.api.updateRowData({ add: [blankRow] });
//         let node = this.props.api.getRowNode(this.id);
//         this.props.api.ensureIndexVisible(node.rowIndex);

//         setTimeout(() => {
//             this.props.api.startEditingCell({
//                 rowIndex: node.rowIndex,
//                 colKey: 'athlete'
//             });
//         }, 300);
//     }

//     render() {
//         return (
//             <div className="add-btn-container">
//                 <button
//                     variant={this.state.editing ? 'outlined' : 'contained'}
//                     color="primary"
//                     onClick={this.addRow}
//                     disabled={this.state.editing}>Add Row</button>
//             </div>
//         );
//     }
// }
