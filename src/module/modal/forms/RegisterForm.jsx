import React from 'react';
import cssForm from './Form.module.css';

const RegisterForm = () => {

    return (
        <div>
            <input className={cssForm.fromInput} placeholder={"email"}/>
            <input className={cssForm.fromInput} placeholder={"password"}/>
            <input className={cssForm.fromInput} placeholder={"firstName"}/>
            <input className={cssForm.fromInput} placeholder={"secondName"}/>
            <button className={cssForm.fromButton} type={"submit"}>Register</button>
        </div>
    );
};

export default RegisterForm;