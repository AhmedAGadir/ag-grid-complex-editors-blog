import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";


export default forwardRef((props, ref) => {
    const inputRef = useRef();
    const [value, setValue] = useState('');

    function inputHandler(e) {
        setValue(e.target.value);
    }

    useImperativeHandle(ref, () => {
        return {
            getValue: () => {
                return value;
            },
            afterGuiAttached: () => {
                setValue(props.value);
                inputRef.current.focus();
                inputRef.current.select();
            },
            isCancelAfterEnd: () => {
                return !value;
            }
        };
    });

    return (
        <input
            type="text"
            className="ag-input-field-input ag-text-field-input"
            style={{ height: 40, fontSize: '1rem' }}
            ref={inputRef}
            onChange={inputHandler}
            value={value}
            placeholder={'Enter ' + props.column.colId}
        />
    )
})




// import React, { Component } from 'react';

// export default class extends Component {
//     constructor(props) {
//         super(props);
//         this.eRef = React.createRef();
//         this.state = {
//             value: ''
//         };
//     }

//     inputHandler = e => {
//         this.setState({ value: e.target.value });
//     }

//     getValue = () => {
//         return this.state.value;
//     }

//     afterGuiAttached = () => {
//         this.setState({ value: this.props.value }, () => {
//             this.eRef.current.focus();
//             this.eRef.current.select();
//         });
//     }

//     isCancelAfterEnd = () => {
//         return !this.state.value;
//     }

//     render() {
//         return (
//             <input
//                 type="text"
//                 className="ag-input-field-input ag-text-field-input"
//                 style={{ height: 40, fontSize: '1rem' }}
//                 ref={this.eRef}
//                 onChange={this.inputHandler}
//                 value={this.state.value}
//                 placeholder='Enter Athlete'
//             />
//         )
//     }
// }