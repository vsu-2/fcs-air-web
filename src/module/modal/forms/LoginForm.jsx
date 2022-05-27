import React from 'react';
import cssForm from './Form.module.css'

const LoginForm = ({setVisibleForgotForm, setVisibleLoginForm}) => {

    function clickForgot() {
        setVisibleForgotForm(true)
        setVisibleLoginForm(false)
    }

    return (
        <div>
            <input className={cssForm.fromInput} placeholder={"email"}/>
            <input className={cssForm.fromInput} placeholder={"password"}/>
            <div className={cssForm.formDiv}>
                <p className={cssForm.forgot} onClick={() => clickForgot()}>Forgot Password?</p>
            </div>
            <button className={cssForm.fromButton} type={"submit"}>Login</button>
        </div>
    );
};

export default LoginForm;