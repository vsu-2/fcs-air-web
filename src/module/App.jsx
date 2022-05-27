import React, {useState} from 'react';
import FindPage from "./top/FindPage/FindPage";
import Top from "./top/Top/Top";
import MainPage from "./body/MainPage";
import Botom from "./botom/Botom";
import Modal from "./modal/Modal";
import RegisterForm from "./modal/forms/RegisterForm";


function App() {

    const [visibleModalRegister, setVisibleModalRegister] = useState(false)

    return (
        <div>
            <Top clickRegister={setVisibleModalRegister}></Top>
            <MainPage></MainPage>
            <Botom></Botom>
            <Modal visible={visibleModalRegister} setVisible={setVisibleModalRegister}>
                <RegisterForm></RegisterForm>
            </Modal>
        </div>
    );
}

export default App;
