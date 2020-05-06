import React, { Component } from 'react';
import './AsyncValidationEditor.css';

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valid: true,
            validating: false
        };

        this.eRef = React.createRef();
        this.debouncedAsyncInputCheck = debounce(this.asyncInputCheck, 1000);
    }

    inputHandler = e => {
        let value = e.target.value;

        this.setState({ value, validating: true }, () => {
            this.debouncedAsyncInputCheck(value)
        });
    }

    asyncInputCheck = value => {
        // random time between 500 and 1500ms
        let timeout = Math.floor(Math.random() * 1000) + 500;

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.condition(value));
            }, timeout);
        })
            .then(valid => this.setState({ valid, validating: false }))
            .catch(err => console.log(err));
    }

    getValue = () => {
        return this.state.value;
    }

    afterGuiAttached = () => {
        this.setState({ value: this.props.value });
    }

    isCancelAfterEnd = () => {
        let value = this.getValue();
        let isValid = this.props.condition(value);
        return !isValid
    }

    render() {
        let validationSymbol = null;
        let txtColor = null;

        if (this.state.validating) {
            txtColor = 'gray';
            validationSymbol = <span className="loading"></span>
        } else {
            if (this.state.valid) {
                txtColor = 'black';
                validationSymbol = <span className="success">✔</span>
            } else {
                txtColor = 'red';
                validationSymbol = <span className="fail">✘</span>
            }
        }

        return (
            <div className="async-validation-container">
                <input
                    className="ag-input-field-input ag-text-field-input"
                    style={{ height: 40, color: txtColor }}
                    ref={this.eRef}
                    onChange={this.inputHandler}
                    value={this.state.value}
                />
                {validationSymbol}
            </div>
        )
    }
}

