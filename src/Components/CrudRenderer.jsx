import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
    margin: '0 10px',
    width: 80
});

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            disabled: false
        };
    }

    componentWillMount() {
        let editingCells = this.props.api.getEditingCells();
        if (editingCells.length !== 0) {
            // this.setState({ disabled: true });
        }
    }

    componentDidMount() {
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

    deleteRow = (force = false) => {
        let data = this.props.data;
        if (force || window.confirm(`are you sure you want to delete this row: ${JSON.stringify(data)})`)) {
            this.props.api.applyTransaction({ remove: [data] });
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
                    onClick={this.deleteRow}
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