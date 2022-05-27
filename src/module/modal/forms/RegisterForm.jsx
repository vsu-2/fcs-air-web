import React from 'react';
import cssForm from './Form.module.css';

const RegisterForm = () => {
    return (
        <div>
            <input className={cssForm.FromInput} placeholder={"email"}/><input className={cssForm.FromInput} placeholder={"password"}/>
            <input className={cssForm.FromInput} placeholder={"password"}/>
            <input className={cssForm.FromInput} placeholder={"password"}/>
            <button className={cssForm.FromButton} type={"submit"}>Register</button>
        </div>
    );
};

export default RegisterForm;