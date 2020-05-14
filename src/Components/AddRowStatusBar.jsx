import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import { uuid } from 'uuidv4';

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


        setTimeout(() => {
            let node = this.props.api.getRowNode(this.id);
            this.props.api.ensureIndexVisible(node.rowIndex);
            this.props.api.dispatchEvent({
                type: 'rowEditingStarted',
                node: node,
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
