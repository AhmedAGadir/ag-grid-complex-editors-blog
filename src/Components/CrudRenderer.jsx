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
            editing: false
        };
    }

    componentDidMount() {
        this.props.api.addEventListener('rowEditingStarted', params => {
            if (this.props.node === params.node) {
                this.startEditing();
            }
        });

        this.props.api.addEventListener('rowEditingStopped', params => {
            if (this.props.node === params.node) {
                this.stopEditing();
            }
        });
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
        if (window.confirm(`are you sure you want to delete this row: ${JSON.stringify(data)})`)) {
            this.props.api.updateRowData({ remove: [data] });
            // weird bug if you don't redraw
            this.props.api.redrawRows();
        }
    }

    render() {
        const startEditingButtons = (
            <>
                <MyButton color="primary" variant="outlined" onClick={this.startEditing}>Edit</MyButton>
                <MyButton color="primary" variant="outlined" onClick={this.deleteRow}>Delete</MyButton>
            </>
        );

        const stopEditingButtons = (
            <>
                <MyButton color="primary" variant="contained" color="primary" onClick={() => this.stopEditing(false)}>Update</MyButton>
                <MyButton color="primary" variant="contained" color="secondary" onClick={() => this.stopEditing(true)}>Cancel</MyButton>
            </>
        );
        return (
            <div>
                {this.state.editing ? stopEditingButtons : startEditingButtons}
            </div>
        )

    }
}