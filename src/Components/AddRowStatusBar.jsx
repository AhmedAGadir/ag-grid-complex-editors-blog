import React, { Component } from 'react';
import { uuid } from 'uuidv4';

import './AddRowStatusBar.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.id = null;
    }


    componentDidMount() {
        this.props.api.addEventListener('rowEditingStarted', () => {
            this.setState({ editing: true });
        });
        this.props.api.addEventListener('rowEditingStopped', () => {
            this.id = null;
            this.setState({ editing: false });
        });
    }

    addRow = () => {
        this.id = uuid();
        let blankRow = { id: this.id };
        this.props.api.updateRowData({ add: [blankRow] });


        // setTimeout(() => {
        let node = this.props.api.getRowNode(this.id);
        this.props.api.ensureIndexVisible(node.rowIndex);
        this.props.api.dispatchEvent({
            type: 'rowEditingStarted',
            node: node,
        });
        // }, 500);
    }

    render() {
        return (
            <div className="status-btn-container">
                <button
                    variant="contained"
                    color="secondary"
                    onClick={this.addRow}
                    disabled={this.state.editing}>Add Row</button>
            </div>
        );
    }
}
