import React, {useState} from 'react';
import cssForm from './Form.module.css'
import Api from "../../Api/Api";
import {AxiosError, AxiosResponse} from "axios";

const ForgotForm = ({setVisibleForm, visible}) => {

    const [email, setEmail] = useState()

    function send(e) {
        e.preventDefault()
        const json = JSON.stringify({
            email: email,
        })
        let response = Api.postUserPassword(json);
        response.then((response: AxiosResponse) => {
            visible("Вам на почту было отправлено письмо с подтверждением!")
            setVisibleForm(false)
        }).catch((reason: AxiosError) => {
            switch (reason.response.status) {
                case 404:
                    visible("Пользователя с таким email не существет!")
                    break
            }
        })
    }

    return (
        <div>
            <div className={cssForm.textDiv}>
                <p className={cssForm.text}>Введите ваш email..</p>
                <p className={cssForm.text}>Мы отправим вам письмо на почту для подтверждения.</p>
            </div>
            <input className={cssForm.fromInput} placeholder={"email"} value={email}
                   onChange={(e) => setEmail(e.target.value)}/>
            <button className={cssForm.fromButton} type={"submit"} onClick={e => send(e)}>Send</button>
        </div>
    );
};

export default ForgotForm;