import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
            <Autocomplete
                style={{ padding: '0 10px' }}
                options={this.props.options}
                value={this.state.value}
                onChange={this.onChangeHandler}
                inputValue={this.state.inputValue}
                onInputChange={this.onInputChangeHandler}
                disableClearable
                renderInput={(params) => (
                    <TextField
                        {...params}
                        style={{ padding: '5px 0' }}
                        placeholder="Select Country" />
                )}
            />
        );
    }
}