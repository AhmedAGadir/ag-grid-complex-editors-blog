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
        d.setHours(0, 0, 0, 0);
        this.setState({ selectedDate: d });
    }

    getValue = () => {
        let dateString = format(this.state.selectedDate, 'dd/MM/yyyy');
        return dateString;
    }

    afterGuiAttached = () => {
        const [match, day, month, year] = this.props.value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        let selectedDate = new Date(year, month - 1, day);
        this.setState({ selectedDate });
    }

    render() {
        return (
            <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                style={{}}>
                <KeyboardDatePicker
                    style={{ margin: 0, padding: '6px 10px', }}
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