import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.eRef = React.createRef();
        this.state = {
            value: ''
        };
    }

    inputHandler = e => {
        this.setState({ value: e.target.value });
    }

    getValue = () => {
        return this.state.value;
    }

    afterGuiAttached = () => {
        this.setState({ value: this.props.value }, () => {
            // this.eRef.current.focus();
            // this.eRef.current.select();
        });
    }

    render() {
        return (
            <input
                className="ag-input-field-input ag-text-field-input"
                style={{ height: 40, fontSize: '1rem' }}
                ref={this.eRef}
                onChange={this.inputHandler}
                value={this.state.value}
            />
        )
    }
}