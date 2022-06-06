import React, {useState} from 'react';
import cssMiddle from "./MiddleInput.module.css";
import cssInput from "../Input.module.css";

const MiddleInput = ({placeholder, changeType = false, type='', ...props}) => {
    const [focus, setFocus] = useState(false);

    if(focus && changeType){
        type = 'date'
    }

    return (
        <div>
            <input onBlur={() =>setFocus(false)} onFocus={() => setFocus(true)} type={type} placeholder={placeholder} className={`${cssMiddle.inputMiddle} ${cssInput.input}`}/>
        </div>
    );
};

export default MiddleInput;