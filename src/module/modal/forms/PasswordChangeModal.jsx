import React from 'react';
import cssForm from "./Form.module.css";

const PasswordChangeModal = ({setVisibleForm}) => {
    return (
        <div>
            <input className={cssForm.fromInput} placeholder={"old password"}/>
            <input className={cssForm.fromInput} placeholder={"new password"}/>
            <button className={cssForm.fromButton} type={"submit"}>Accept</button>
        </div>
    );
};

export default PasswordChangeModal;