import React, { Component } from 'react';
// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import './AsyncValidationEditor.css';
import { debounce } from '../utils';


// export default forwardRef((props, ref) => {

//     const [value, setValue] = useState('');
//     const [valid, setValid] = useState(true);
//     const [validating, setValidating] = useState(false);
//     const [touched, setTouched] = useState(false);

//     const inputRef = useRef();


//     const inputHandler = e => {
//         setTouched(true);

//         let value = e.target.value;

//         setValue(value);
//         setValidating(true)
//     }

//     let debouncedAsyncInputCheck;

//     useEffect(() => {
//         debouncedAsyncInputCheck = debounce(asyncInputCheck, 1000);
//     }, []);

//     const asyncInputCheck = value => {
//         // random time between 500 and 1500ms
//         let timeout = Math.floor(Math.random() * 1000) + 500;

//         new Promise((resolve, reject) => {
//             if (value === '') {
//                 resolve(false);
//             } else {
//                 setTimeout(() => {
//                     resolve(props.condition(value));
//                 }, timeout);
//             }
//         })
//             .then(valid => {
//                 console.log('setting valid, validating')
//                 setValid(valid);
//                 setValidating(false);
//             })
//             .catch(err => console.log(err));
//     }

//     useEffect(() => {
//         if (debouncedAsyncInputCheck) {
//             debouncedAsyncInputCheck(value)
//         }
//     }, [value]);

//     useImperativeHandle(ref, () => {
//         return {
//             getValue() {
//                 return value;
//             },
//             afterGuiAttached() {
//                 setValue(props.value);
//             },
//             isCancelAfterEnd() {
//                 return !valid || validating;
//             }
//         };
//     });

//     let loadingElement = null;
//     let txtColor = null;

//     if (validating) {
//         txtColor = 'gray';
//         loadingElement = <span className="loading"></span>
//     } else {
//         if (valid) {
//             txtColor = 'black'
//             loadingElement = <span className="success">✔</span>
//         } else {
//             txtColor = 'red';
//             loadingElement = <span className="fail">✘</span>
//         }
//     }

//     if (!touched) {
//         txtColor = 'black';
//         loadingElement = null;
//     }

//     return (
//         <div className="async-validation-container">
//             <input
//                 className="ag-input-field-input ag-text-field-input"
//                 style={{ height: 40, color: txtColor, fontSize: '1rem' }}
//                 ref={inputRef}
//                 onInput={inputHandler}
//                 value={value}
//                 placeholder="Enter Sport"
//             />
//             {loadingElement}
//         </div>
//     )
// })

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

