import 'date-fns';
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { format } from 'date-fns';



export default class extends Component {
    constructor(props) {
        super(props);
        this.eRef = React.createRef();
        this.state = {
            selectedDate: null
        };
    }

    handleDateChange = d => {
        console.log('date', d)
        if (d) {
            d.setHours(0, 0, 0, 0);
        }
        this.setState({ selectedDate: d });
    }

    getValue = () => {
        let selectedState = this.state.selectedDate;
        let dateString = null;
        if (selectedState) {
            dateString = format(selectedState, 'dd/MM/yyyy');
        }
        return dateString;
    }

    afterGuiAttached = () => {
        if (!this.props.value) {
            return;
        }
        const [match, day, month, year] = this.props.value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        let selectedDate = new Date(year, month - 1, day);
        this.setState({ selectedDate });
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    style={{ width: '100%', margin: 0, padding: '6px 10px', }}
                    margin="normal"
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    variant="inline"
                    disableToolbar
                />
            </MuiPickersUtilsProvider>
        )
    }
}