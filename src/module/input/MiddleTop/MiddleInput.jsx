import React from 'react';
import cssMiddle from "./MiddleInput.module.css";
import cssInput from "../Input.module.css";

const MiddleInput = ({placeholder, ...props}) => {
    return (
        <div>
            <input placeholder={placeholder} className={`${cssMiddle.inputMiddle} ${cssInput.input}`}/>
        </div>
    );
};

export default MiddleInput;