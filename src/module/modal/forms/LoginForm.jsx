import React, {useContext, useState} from 'react';
import cssForm from './Form.module.css'
import Api from "../../Api/Api";
import {AxiosError} from "axios";
import {AuthContext} from "../../Context/context";
import {AxiosResponse} from "axios";

const LoginForm = ({setVisibleForgotForm, setVisibleLoginForm, visible}) => {

    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function clickForgot() {
        setVisibleForgotForm(true)
        setVisibleLoginForm(false)
    }

    function sendLogin(e) {
        e.preventDefault()
        const json = JSON.stringify({
            email: email,
            password: password,
        })
        let response = Api.postLogin(json);
        response.then((response: AxiosResponse) => {
            auth.setAuth({isAuth: true, token: response.data.token})
            localStorage.setItem("token", response.data.token)
            setVisibleLoginForm(false)
            setEmail('')
            setPassword('')
            visible("Вы успешно вошли.")
        }).catch((reason: AxiosError) => {
            switch (reason.response.status) {
                case 401:
                    visible("Неверный пароль!")
                    break;
                case 404:
                    visible("Пользователя с таким email не существует!")
                    break;
                case 406:
                    visible("Сначала подтвердите email!")
                    break;
                case 410:
                    visible("Пользователь забанен!")
                    break;
                default:
                    visible("Неизвестная ошибка!")
                    break;
            }
        })
    }

    return (
        <div>
            <form>
                <input className={cssForm.fromInput} placeholder={"email"} value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <input className={cssForm.fromInput} placeholder={"password"} value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <div className={cssForm.formDiv}>
                    <p className={cssForm.forgot} onClick={() => clickForgot()}>Forgot Password?</p>
                </div>
                <button className={cssForm.fromButton} type={"submit"} onClick={sendLogin}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;