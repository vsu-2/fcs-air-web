import React, {useState} from 'react';
import Top from "./top/Top/Top";
import MainPage from "./body/MainPage";
import Botom from "./botom/Botom";
import Modal from "./modal/Modal";
import RegisterForm from "./modal/forms/RegisterForm";
import ForgotForm from "./modal/forms/ForgotForm";
import LoginForm from "./modal/forms/LoginForm";
import {Button} from "react-bootstrap";
import axios from "axios";
import {
    BrowserRouter,
    Routes,
    Route, Link,
} from "react-router-dom";
import Profile from "./body/Profile";
import PasswordChangeModal from "./modal/forms/PasswordChangeModal";


function App() {

    const [visibleModalRegister, setVisibleModalRegister] = useState(false)
    const [visibleModalForgot, setVisibleModalForgot] = useState(false)
    const [visibleModalLogin, setVisibleModalLogin] = useState(false)
    const [visibleChangePassword, setVisibleChangePassword] = useState(false)

    async function get() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(res.data)
    }

    return (
        <div>
            <BrowserRouter>
                <Button onClick={() => get()}>Get Posts</Button>
                <Top clickRegister={setVisibleModalRegister} clickLogin={setVisibleModalLogin}></Top>
                <Routes>
                    <Route path={'/'} element={<MainPage></MainPage>}></Route>
                    <Route path={'/profile/:id'} element={<Profile setChangePasswordVisible={setVisibleChangePassword}></Profile>}></Route>
                </Routes>
                <Botom></Botom>
                <Modal visible={visibleModalRegister} setVisible={setVisibleModalRegister}>
                    <RegisterForm></RegisterForm>
                </Modal>
                <Modal visible={visibleModalForgot} setVisible={setVisibleModalForgot}>
                    <ForgotForm></ForgotForm>
                </Modal>
                <Modal visible={visibleModalLogin} setVisible={setVisibleModalLogin}>
                    <LoginForm setVisibleForgotForm={setVisibleModalForgot}
                               setVisibleLoginForm={setVisibleModalLogin}></LoginForm>
                </Modal>
                <Modal visible={visibleChangePassword} setVisible={setVisibleChangePassword}>
                    <PasswordChangeModal></PasswordChangeModal>
                </Modal>
            </BrowserRouter>
        </div>
    );
}

export default App;
