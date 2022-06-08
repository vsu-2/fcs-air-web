import React, {useState} from 'react';
import cssForm from "./Form.module.css";
import Api from "../../Api/Api";
import {AxiosError, AxiosResponse} from "axios";

const ForgotConfirm = ({session, setVisible, visible}) => {

    const [password, setPassword] = useState()

    function send(e) {
        e.preventDefault()
        const json = JSON.stringify({
            session_id: session,
            new_password: password,
        })
        let response = Api.putUserPassword(json);
        response.then((response: AxiosResponse) => {
            visible("Пароль успешно сменён!")
            setVisible(false)
        }).catch((reason: AxiosError) => {
            switch (reason.response.status) {
                case 408:
                    visible("Сылка уже не действительна!")
                    break
            }
        })
    }

    return (
        <div>
            <div className={cssForm.textDiv}>
                <p className={cssForm.text}>Введите новый пароль.</p>
            </div>
            <input className={cssForm.fromInput} placeholder={"new password"} value={password} onChange={e => setPassword(e.target.value)}/>
            <button className={cssForm.fromButton} type={"submit"} onClick={e => send(e)}>Send</button>
        </div>
    );
};

export default ForgotConfirm;