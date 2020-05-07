import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { styled } from '@material-ui/core/styles';

const MyAutoComplete = styled(Autocomplete)({
    height: 40,
    width: '100%',
    padding: '0 15px',
    // background: 'blue'
});

const MyTextField = styled(TextField)({
    height: 40,
    // background: 'green',
    padding: '6px 0',
    // fontSize: 12,
    width: 'calc(100% - 30px)',
});

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            inputValue: this.props.inputValue
        };
    }

    onChangeHandler = (e, value) => {
        this.setState({ value });
    }

    onInputChangeHandler = (e, inputValue) => {
        this.setState({ inputValue });
    }

    getValue = () => {
        return this.state.value;
    }

    render() {

        return (
            <MyAutoComplete
                options={this.props.options}
                value={this.state.value}
                onChange={this.onChangeHandler}
                inputValue={this.state.inputValue}
                onInputChange={this.onInputChangeHandler}
                renderInput={(params) => <MyTextField {...params} />}
            />
        );
    }
}