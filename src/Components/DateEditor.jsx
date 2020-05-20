import 'date-fns';
import React, { useState, forwardRef, useImperativeHandle } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { format } from 'date-fns';

export default forwardRef((props, ref) => {
    const [selectedDate, setSelectedDate] = useState(null);

    function handleDateChange(d) {
        if (d) {
            d.setHours(0, 0, 0, 0);
        }
        setSelectedDate(d);
    }

    useImperativeHandle(ref, () => {
        return {
            getValue: () => {
                let dateString = null;
                if (selectedDate) {
                    dateString = format(selectedDate, 'dd/MM/yyyy');
                }
                return dateString;
            },
            isCancelAfterEnd: () => {
                return !selectedDate;
            },

            afterGuiAttached: () => {
                if (!props.value) {
                    return;
                }
                const [match, day, month, year] = props.value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
                let selectedDate = new Date(year, month - 1, day);
                setSelectedDate(selectedDate);
            }
        };
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                style={{ width: '100%', margin: 0, padding: '6px 10px', }}
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                variant="inline"
                disableToolbar
                placeholder={'Enter ' + props.column.colId}
            />
        </MuiPickersUtilsProvider>
    )
});


// import 'date-fns';
// import React, { Component } from 'react';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

// import { format } from 'date-fns';



// export default class extends Component {
//     constructor(props) {
//         super(props);
//         this.eRef = React.createRef();
//         this.state = {
//             selectedDate: null
//         };
//     }

//     handleDateChange = d => {
//         console.log('date', d)
//         if (d) {
//             d.setHours(0, 0, 0, 0);
//         }
//         this.setState({ selectedDate: d });
//     }

//     getValue = () => {
//         let selectedState = this.state.selectedDate;
//         let dateString = null;
//         if (selectedState) {
//             dateString = format(selectedState, 'dd/MM/yyyy');
//         }
//         return dateString;
//     }

//     isCancelAfterEnd = () => {
//         return !this.state.selectedDate;
//     }

//     afterGuiAttached = () => {
//         if (!this.props.value) {
//             return;
//         }
//         const [match, day, month, year] = this.props.value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
//         let selectedDate = new Date(year, month - 1, day);
//         this.setState({ selectedDate });
//     }

//     render() {
//         return (
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <KeyboardDatePicker
//                     style={{ width: '100%', margin: 0, padding: '6px 10px', }}
//                     margin="normal"
//                     id="date-picker-dialog"
//                     format="dd/MM/yyyy"
//                     value={this.state.selectedDate}
//                     onChange={this.handleDateChange}
//                     variant="inline"
//                     disableToolbar
//                     placeholder="Enter Date"
//                 />
//             </MuiPickersUtilsProvider>
//         )
//     }
// }