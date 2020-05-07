import React, { Component } from 'react';
import './ValidationEditor.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.eRef = React.createRef();
        this.state = {
            value: '',
            valid: true
        };
    }

    inputHandler = e => {
        let value = e.target.value;
        let isValueValid = this.props.condition(value);

        this.setState({
            value,
            valid: isValueValid
        });
    }

    getValue = () => {
        return this.state.value;
    }

    afterGuiAttached = () => {
        this.setState({ value: this.props.value });
    }

    isCancelAfterEnd = () => {
        let value = this.getValue();
        let isValueValid = this.props.condition(value);
        return !isValueValid
    }

    render() {
        let classList = ["ag-input-field-input", "ag-text-field-input"];

        if (this.state.valid) {
            classList.push('success')
        } else {
            classList.push('fail');
        }

        return (
            <div className="validation-container">
                <input
                    className={classList.join(' ')}
                    style={{ fontSize: 15 }}
                    ref={this.eRef}
                    onChange={this.inputHandler}
                    value={this.state.value}
                />
            </div>
        )
    }
}