import React, {useState} from 'react';
import cssMiddle from "./MiddleInput.module.css";
import cssInput from "../Input.module.css";

const MiddleInput = ({placeholder, changeType = false, type='', value, setValue, ...props}) => {
    const [focus, setFocus] = useState(false);

    if(focus && changeType){
        type = 'date'
    }

    return (
        <div>
            <input value={value} onChange={event => setValue(event.target.value)}
                onBlur={() =>setFocus(false)} onFocus={() => setFocus(true)} type={type} placeholder={placeholder} className={`${cssMiddle.inputMiddle} ${cssInput.input}`}/>
        </div>
    );
};

export default MiddleInput;