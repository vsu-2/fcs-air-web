import React from 'react';
import cssRight from "./RightInput.module.css";
import cssInput from "../Input.module.css";

const RightInput = ({placeholder, ...props}) => {
    return (
        <div>
            <input placeholder={placeholder} className={`${cssRight.inputRight} ${cssInput.input}`}/>
            <div>
                <p className={cssInput.input}>
                    Эконом
                </p>
                <p className={cssInput.input}>
                    Бизнес
                </p>
            </div>
        </div>
    );
};

export default RightInput;