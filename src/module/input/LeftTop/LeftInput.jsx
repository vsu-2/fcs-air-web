import React from 'react';
import cssLeft from './LeftInput.module.css'
import cssInput from '../Input.module.css'

const LeftInput = ({placeholder, value, setValue, ...props}) => {
    return (
        <div>
            <input placeholder={placeholder} className={`${cssLeft.inputLeft} ${cssInput.input}`} value={value} onChange={event => setValue(event.target.value)}/>
        </div>
    );
};

export default LeftInput;