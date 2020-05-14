import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
    color: 'white',
    borderColor: 'white',
    margin: 12,
    '&:disabled': {
        color: 'grey',
        borderColor: 'grey',
    }
});

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
            this.setState({ editing: false });
        });
    }

    addRow = () => {
        this.props.api.updateRowData({ add: [{}] });
        let rowIndex = this.props.api.getDisplayedRowCount() - 1;
        this.props.api.ensureIndexVisible(rowIndex);
        setTimeout(() => {
            let rowNode = this.props.api.getRowNode(rowIndex);
            this.props.api.dispatchEvent({
                type: 'rowEditingStarted',
                node: rowNode,
            });
        }, 500);
    }

    render() {
        return (
            <div>
                <MyButton
                    color="primary"
                    variant="outlined"
                    disabled={this.state.editing}
                    onClick={this.addRow}>Add Row</MyButton>
            </div>
        );
    }
}
