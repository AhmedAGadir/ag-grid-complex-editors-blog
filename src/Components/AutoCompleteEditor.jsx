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
        // this.eRef = React.createRef();
        this.state = {
            value: this.props.value,
            inputValue: this.props.inputValue
        };
    }

    onChangeHandler = (e, value) => {
        console.log('onChange', value);
        this.setState({ value });
    }

    onInputChangeHandler = (e, inputValue) => {
        console.log('onInput', inputValue);
        this.setState({ inputValue });
    }

    getValue = () => {
        console.log('getValue', this.state.value);
        return this.state.value;
    }

    afterGuiAttached = () => {
        // this.setState({ value: this.props.value }, () => {
        // this.eRef.current.focus();
        // this.eRef.current.select();
        // });
    }

    // isPopup = () => {
    //     return true;
    // }

    render() {
        // return (
        //     <input
        //         className="ag-input-field-input ag-text-field-input"
        //         ref={this.eRef}
        //         onChange={this.inputHandler}
        //         value={this.state.value}
        //     />
        // )
        return (
            <MyAutoComplete
                options={this.props.options}
                //   getOptionLabel={(option) => option.title}
                // style={{ background: 'orange' }}
                value={this.state.value}
                onChange={this.onChangeHandler}
                inputValue={this.state.inputValue}
                onInputChange={this.onInputChangeHandler}
                renderInput={(params) => <MyTextField {...params} />}
            />
        );
    }
}