import React, {useState} from 'react';
import cssForm from './Form.module.css';
import Api from "../../Api/Api";
import axios, {AxiosError} from "axios";

const RegisterForm = ({visible, setVisibleForm}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    function sendRegister(e){
        e.preventDefault()
        const json = JSON.stringify({
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        })
        let response = Api.postRegister(json);
        response.then(() => {
            setVisibleForm(true)
            visible("Вы успешно зарегистрировались.\nВам на почту отправлено письмо!")
        }).catch((reason: AxiosError) => {
            if (reason.response.status === 409) {
                visible("Этот email уже занят!")
            } else {
                visible("Неизвестная ошибка!")
            }
        })
    }

    return (
        <div>
            <form>
                <input className={cssForm.fromInput} placeholder={"email"} value={email} onChange={e => setEmail(e.target.value)}/>
                <input className={cssForm.fromInput} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
                <input className={cssForm.fromInput} placeholder={"firstName"} value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input className={cssForm.fromInput} placeholder={"secondName"} value={lastName} onChange={e => setLastName(e.target.value)}/>
                <button className={cssForm.fromButton} type={"submit"} onClick={sendRegister}>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;