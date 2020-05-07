import React, { Component } from 'react';
import './AsyncValidationEditor.css';
import { debounce } from '../utils';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valid: true,
            validating: false,
            touched: false
        };

        this.eRef = React.createRef();
        this.debouncedAsyncInputCheck = debounce(this.asyncInputCheck, 1000);
    }

    inputHandler = e => {
        this.setState({ touched: true });

        let value = e.target.value;

        this.setState({ value, validating: true }, () => {
            this.debouncedAsyncInputCheck(value)
        });
    }

    asyncInputCheck = value => {
        // random time between 0 and 1000ms
        let timeout = Math.floor(Math.random() * 1000);

        new Promise((resolve, reject) => {
            if (value === '') {
                resolve(false);
            } else {
                setTimeout(() => {
                    resolve(this.props.condition(value));
                }, timeout);
            }
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
        return !this.state.valid || this.state.validating;
    }

    render() {
        let loadingElement = null;
        let txtColor = null;

        if (this.state.validating) {
            txtColor = 'gray';
            loadingElement = <span className="loading"></span>
        } else {
            if (this.state.valid) {
                txtColor = 'black'
                loadingElement = <span className="success">✔</span>
            } else {
                txtColor = 'red';
                loadingElement = <span className="fail">✘</span>
            }
        }

        if (!this.state.touched) {
            txtColor = 'black';
            loadingElement = null;
        }

        return (
            <div className="async-validation-container">
                <input
                    className="ag-input-field-input ag-text-field-input"
                    style={{ height: 40, color: txtColor, fontSize: '1rem' }}
                    ref={this.eRef}
                    onChange={this.inputHandler}
                    value={this.state.value}
                    placeholder="Enter Sport"
                />
                {loadingElement}
            </div>
        )
    }
}

