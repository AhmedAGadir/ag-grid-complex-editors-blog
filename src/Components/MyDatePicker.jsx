import 'date-fns';
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null
        };
    }


    handleDateChange = updatedDate => {
        this.setDate(updatedDate)
    }

    getDate = () => {
        return this.state.selectedDate;
    }

    setDate = d => {
        if (d) {
            // set time to midnight
            d.setHours(0, 0, 0, 0);
        }
        this.setState({ selectedDate: d }, this.props.onDateChanged);
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                />
            </MuiPickersUtilsProvider>
        )
    }
}