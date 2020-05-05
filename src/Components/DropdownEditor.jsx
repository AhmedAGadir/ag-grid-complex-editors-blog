import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { styled } from '@material-ui/core/styles';

const MyFormControl = styled(FormControl)({
    height: 40,
    width: '100%',
});

const MySelect = styled(Select)({
    height: '100%',
});



export default class extends Component {
    constructor(props) {
        super(props);
        this.eRef = React.createRef();
        this.state = {
            value: ''
        };
    }

    getValue = () => {
        return this.state.value;
    }

    afterGuiAttached = () => {
        this.setState({ value: this.props.value });
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    // isPopup = () => {
    //     return true;
    // }

    render() {

        return (
            <MyFormControl>
                <MySelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {this.props.values.map(value => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))}
                </MySelect>
            </MyFormControl>
        )
    }
}