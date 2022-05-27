import React, {useState} from 'react';
import FindPage from "./top/FindPage/FindPage";
import Top from "./top/Top/Top";
import MainPage from "./body/MainPage";
import Botom from "./botom/Botom";
import Modal from "./modal/Modal";
import RegisterForm from "./modal/forms/RegisterForm";
import ForgotForm from "./modal/forms/ForgotForm";
import LoginForm from "./modal/forms/LoginForm";
import {Button} from "react-bootstrap";
import axios from "axios";


function App() {

    const [visibleModalRegister, setVisibleModalRegister] = useState(false)
    const [visibleModalForgot, setVisibleModalForgot] = useState(false)
    const [visibleModalLogin, setVisibleModalLogin] = useState(false)

    async function get() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(res.data)
    }

    return (
        <div>
            <Button onClick={() => get()}>Get Posts</Button>
            <Top clickRegister={setVisibleModalRegister} clickLogin={setVisibleModalLogin}></Top>
            <MainPage></MainPage>
            <Botom></Botom>
            <Modal visible={visibleModalRegister} setVisible={setVisibleModalRegister}>
                <RegisterForm></RegisterForm>
            </Modal>
            <Modal visible={visibleModalForgot} setVisible={setVisibleModalForgot}>
                <ForgotForm></ForgotForm>
            </Modal>
            <Modal visible={visibleModalLogin} setVisible={setVisibleModalLogin}>
                <LoginForm setVisibleForgotForm={setVisibleModalForgot} setVisibleLoginForm={setVisibleModalLogin}></LoginForm>
            </Modal>
        </div>
    );
}

export default App;
