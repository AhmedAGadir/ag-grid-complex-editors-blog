import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
    color: 'white',
    borderColor: 'white',
    margin: 12
});

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    addRow = () => {
        this.props.api.updateRowData({ add: [{}] });
        let rowIndex = this.props.api.getDisplayedRowCount() - 1;
        this.props.api.ensureIndexVisible(rowIndex);
        let rowNode = this.props.api.getRowNode(rowIndex);
        setTimeout(() => {
            let crudRenderer = this.props.api.getCellRendererInstances({ rowNodes: [rowNode], colKey: 'crud' })[0].componentInstance
            crudRenderer.startEditing();
        }, 500)
    }

    render() {
        return (
            <div>
                <MyButton color="primary" variant="outlined" onClick={this.addRow}>Add Row</MyButton>
            </div>
        );
    }
}
