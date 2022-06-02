import React, {useContext, useState} from 'react';
import cssForm from "./Form.module.css";
import {AuthContext} from "../../Context/context";
import Api from "../../Api/Api";
import {AxiosError, AxiosResponse} from "axios";

const PasswordChangeModal = ({setVisibleForm, visible}) => {

    const auth = useContext(AuthContext)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    function sendChangePassword(e){
        e.preventDefault()
        const json = JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
        })
        const token = auth.auth.token
        Api.putMePassword(json, token).then((response: AxiosResponse) => {
            setVisibleForm(false)
        }).catch((reason: AxiosError) => {
            if (reason.response.status === 403) {
                visible("Неверный старый пароль!")
            } else {
                visible("Неизвестная ошибка!")
            }
        });
    }

    return (
        <div>
            <input className={cssForm.fromInput} placeholder={"old password"} value={oldPassword} onChange={event =>setOldPassword(event.target.value)}/>
            <input className={cssForm.fromInput} placeholder={"new password"} value={newPassword} onChange={event => setNewPassword(event.target.value)}/>
            <button className={cssForm.fromButton} type={"submit"} onClick={event => sendChangePassword(event)}>Accept</button>
        </div>
    );
};

export default PasswordChangeModal;