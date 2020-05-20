import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default forwardRef((props, ref) => {
    const [selectedDate, setSelectedDate] = useState(null);

    function handleDateChange(d) {
        if (d) {
            // set time to midnight
            d.setHours(0, 0, 0, 0);
        }
        setSelectedDate(d);
    }

    useEffect(props.onDateChanged, [selectedDate])

    useImperativeHandle(ref, () => {
        return {
            getDate: () => {
                return selectedDate;
            },
            setDate: d => {
                handleDateChange(d);
            }
        };
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    )
})




// import 'date-fns';
// import React, { Component } from 'react';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

// export default class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedDate: null
//         };
//     }


//     handleDateChange = updatedDate => {
//         this.setDate(updatedDate)
//     }

//     getDate = () => {
//         return this.state.selectedDate;
//     }

//     setDate = d => {
//         if (d) {
//             // set time to midnight
//             d.setHours(0, 0, 0, 0);
//         }
//         this.setState({ selectedDate: d }, this.props.onDateChanged);
//     }

//     render() {
//         return (
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <KeyboardDatePicker
//                     margin="normal"
//                     id="date-picker-dialog"
//                     format="dd/MM/yyyy"
//                     value={this.state.selectedDate}
//                     onChange={this.handleDateChange}
//                 />
//             </MuiPickersUtilsProvider>
//         )
//     }
// }