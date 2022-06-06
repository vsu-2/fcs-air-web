import React from 'react';
import cssRight from "./RightInput.module.css";
import cssInput from "../Input.module.css";

const RightInput = ({placeholder, setValue, ...props}) => {
    return (
        <div>
            <select placeholder={placeholder} className={`${cssRight.inputRight} ${cssInput.input}`} onChange={event => setValue(event.target.value)}>
                <option>Эконом</option>
                <option>Бизнес</option>
            </select>
            {/*<div>*/}
            {/*    <p className={cssInput.input}>*/}
            {/*        Эконом*/}
            {/*    </p>*/}
            {/*    <p className={cssInput.input}>*/}
            {/*        Бизнес*/}
            {/*    </p>*/}
            {/*</div>*/}
        </div>
    );
};

export default RightInput;