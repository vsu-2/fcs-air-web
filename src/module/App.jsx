import React, {useEffect, useState} from 'react';
import Top from "./top/Top/Top";
import MainPage from "./body/MainPage";
import Botom from "./botom/Botom";
import Modal from "./modal/Modal";
import RegisterForm from "./modal/forms/RegisterForm";
import ForgotForm from "./modal/forms/ForgotForm";
import LoginForm from "./modal/forms/LoginForm";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Profile from "./body/Profile";
import PasswordChangeModal from "./modal/forms/PasswordChangeModal";
import Log from "./Errors/Log";
import {AuthContext} from "./Context/context";
import TicketPage from "./body/TicketPage";
import Activate from "./body/Activate";
import FavoritePage from "./body/FavoritePage";


function App() {
    const [auth, setAuth] = useState({isAuth: false, token: ''})

    const [visibleModalRegister, setVisibleModalRegister] = useState(false)
    const [visibleModalForgot, setVisibleModalForgot] = useState(false)
    const [visibleModalLogin, setVisibleModalLogin] = useState(false)
    const [visibleChangePassword, setVisibleChangePassword] = useState(false)
    const [filter, setFilter] = useState({from: '', to: '', date_to: '', class: 'Y'})

    const [isVisibleError, setVisibleError] = useState(false)
    const [valueError, setValueError] = useState('')

    async function callbackError(valueError) {
        setValueError(valueError)
        setVisibleError(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setVisibleError(false)
    }

    useEffect(() => {
        let savedToken = localStorage.getItem("token")
        console.log(savedToken + " token")
        if(savedToken) {
            setAuth({isAuth: true, token: savedToken})
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            auth: auth,
            setAuth: setAuth
        }}>
            <div>
                <BrowserRouter>
                    <Top clickRegister={setVisibleModalRegister} clickLogin={setVisibleModalLogin} filter={setFilter}></Top>
                    <Routes>
                        <Route path={'/'} element={<MainPage></MainPage>}></Route>
                        <Route path={'/profile'} element={<Profile
                            setChangePasswordVisible={setVisibleChangePassword} visible={callbackError}></Profile>}>
                        </Route>
                        <Route path={'/tickets'}
                               element={<TicketPage filter={filter} setFilter={setFilter}></TicketPage>}>
                        </Route>
                        <Route path={'/activate'}
                               element={<Activate></Activate>}>
                        </Route>
                        <Route path={'/favorite'}
                               element={<FavoritePage></FavoritePage>}>
                        </Route>
                    </Routes>
                    <Botom></Botom>
                    <Modal visible={visibleModalRegister} setVisible={setVisibleModalRegister}>
                        <RegisterForm visible={callbackError} setVisibleForm={setVisibleModalRegister}></RegisterForm>
                    </Modal>
                    <Modal visible={visibleModalForgot} setVisible={setVisibleModalForgot}>
                        <ForgotForm></ForgotForm>
                    </Modal>
                    <Modal visible={visibleModalLogin} setVisible={setVisibleModalLogin}>
                        <LoginForm setVisibleForgotForm={setVisibleModalForgot}
                                   setVisibleLoginForm={setVisibleModalLogin}
                                   visible={callbackError}
                        ></LoginForm>
                    </Modal>
                    <Modal visible={visibleChangePassword} setVisible={setVisibleChangePassword}>
                        <PasswordChangeModal setVisibleForm={setVisibleChangePassword} visible={callbackError}></PasswordChangeModal>
                    </Modal>
                    <Log isNone={isVisibleError} value={valueError}></Log>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
