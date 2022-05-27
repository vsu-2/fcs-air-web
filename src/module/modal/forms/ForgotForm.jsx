import React from 'react';
import cssForm from './Form.module.css'

const ForgotForm = () => {
    return (
        <div>
            <div className={cssForm.textDiv}>
                <p className={cssForm.text}>Enter your email.</p>
                <p className={cssForm.text}>We send mail for accepting your self.</p>
            </div>
            <input className={cssForm.fromInput} placeholder={"email"}/>
            <button className={cssForm.fromButton} type={"submit"}>Send</button>
        </div>
    );
};

export default ForgotForm;