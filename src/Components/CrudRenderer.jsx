import React, { Component } from 'react';
import Button from '@material-ui/core/Button'

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    startEditing = () => {
        // only allow this to be invoked once
        if (!this.state.editing) {
            this.props.api.startEditingCell({
                rowIndex: this.props.rowIndex,
                colKey: this.props.column.colId
            });
            this.setState({ editing: true });
        }
    }

    stopEditing = (bool) => {
        // only allow this to be invoked once
        if (this.state.editing) {
            this.props.api.stopEditing(bool);
            this.setState({ editing: false });
        }
    }

    deleteRow = () => {
        let data = this.props.data;
        this.props.api.updateRowData({ remove: [data] });
        // weird bug if you don't redraw
        this.props.api.redrawRows();
    }

    render() {
        const startEditingButtons = (
            <div>
                <Button color="primary" variant="outlined" onClick={this.startEditing}>Edit</Button>
                <Button color="primary" variant="outlined" onClick={this.deleteRow}>Delete</Button>
            </div>
        );

        const stopEditingButtons = (
            <div>
                <Button color="primary" variant="outlined" onClick={() => this.stopEditing(false)}>Update</Button>
                <Button color="primary" variant="outlined" onClick={() => this.stopEditing(true)}>Cancel</Button>
            </div>
        );
        return (
            <div>
                {this.state.editing ? stopEditingButtons : startEditingButtons}
            </div>
        )

    }
}