import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import './AsyncValidationEditor.css';
import { useDebounce } from '../utils';

export default forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [valid, setValid] = useState(true);
    const [validating, setValidating] = useState(false);
    const [touched, setTouched] = useState(false);

    const debouncedInputVal = useDebounce(inputValue, 1000);

    const inputHandler = e => {
        let value = e.target.value;
        setTouched(true);
        setInputValue(value);
        setValidating(true);
    }

    useEffect(() => {
        // random time between 0 and 1000ms
        let timeout = Math.floor(Math.random() * 1000);

        new Promise((resolve, reject) => {
            if (inputValue === '') {
                resolve(false);
            } else {
                setTimeout(() => {
                    resolve(props.condition(inputValue));
                }, timeout);
            }
        })
            .then(valid => {
                setValid(valid);
                setValidating(false)
            })
            .catch(err => console.log(err));
    }, [debouncedInputVal]);

    useImperativeHandle(ref, () => {
        return {
            getValue: () => {
                return inputValue;
            },
            afterGuiAttached: () => {
                setInputValue(props.value);
            },
            isCancelAfterEnd: () => {
                return !valid || validating;
            },
        };
    });

    let loadingElement = null;
    let txtColor = null;

    if (validating) {
        txtColor = 'gray';
        loadingElement = <span className="loading"></span>
    } else {
        if (valid) {
            txtColor = 'black'
            loadingElement = <span className="success">✔</span>
        } else {
            txtColor = '#E91E63';
            loadingElement = <span className="fail">✘</span>
        }
    }

    if (!touched) {
        txtColor = 'black';
        loadingElement = null;
    }

    return (
        <div className="async-validation-container">
            <input
                className="ag-input-field-input ag-text-field-input"
                style={{ height: 40, color: txtColor, fontSize: '1rem' }}
                onChange={inputHandler}
                value={inputValue}
                placeholder="Enter Sport"
            />
            {loadingElement}
        </div>
    )
})



// import React, { Component } from 'react';
// import './AsyncValidationEditor.css';
// import { debounce } from '../utils';

// export default class extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             value: '',
//             valid: true,
//             validating: false,
//             touched: false
//         };

//         this.eRef = React.createRef();
//         this.debouncedAsyncInputCheck = debounce(this.asyncInputCheck, 1000);
//     }

//     inputHandler = e => {
//         this.setState({ touched: true });

//         let value = e.target.value;

//         this.setState({ value, validating: true }, () => {
//             this.debouncedAsyncInputCheck(value)
//         });
//     }

//     asyncInputCheck = value => {
//         // random time between 0 and 1000ms
//         let timeout = Math.floor(Math.random() * 1000);

//         new Promise((resolve, reject) => {
//             if (value === '') {
//                 resolve(false);
//             } else {
//                 setTimeout(() => {
//                     resolve(this.props.condition(value));
//                 }, timeout);
//             }
//         })
//             .then(valid => this.setState({ valid, validating: false }))
//             .catch(err => console.log(err));
//     }

//     getValue = () => {
//         return this.state.value;
//     }

//     afterGuiAttached = () => {
//         this.setState({ value: this.props.value });
//     }

//     isCancelAfterEnd = () => {
//         return !this.state.valid || this.state.validating;
//     }

//     render() {
//         let loadingElement = null;
//         let txtColor = null;

//         if (this.state.validating) {
//             txtColor = 'gray';
//             loadingElement = <span className="loading"></span>
//         } else {
//             if (this.state.valid) {
//                 txtColor = 'black'
//                 loadingElement = <span className="success">✔</span>
//             } else {
//                 txtColor = '#E91E63';
//                 loadingElement = <span className="fail">✘</span>
//             }
//         }

//         if (!this.state.touched) {
//             txtColor = 'black';
//             loadingElement = null;
//         }

//         return (
//             <div className="async-validation-container">
//                 <input
//                     className="ag-input-field-input ag-text-field-input"
//                     style={{ height: 40, color: txtColor, fontSize: '1rem' }}
//                     ref={this.eRef}
//                     onChange={this.inputHandler}
//                     value={this.state.value}
//                     placeholder="Enter Sport"
//                 />
//                 {loadingElement}
//             </div>
//         )
//     }
// }

