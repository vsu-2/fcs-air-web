import React from 'react';
import cssLeft from './LeftInput.module.css'
import cssInput from '../Input.module.css'

const LeftInput = ({placeholder, ...props}) => {
    return (
        <div>
            <input placeholder={placeholder} className={`${cssLeft.inputLeft} ${cssInput.input}`}/>
        </div>
    );
};

export default LeftInput;