import React from 'react';
import FindPage from "./top/FindPage/FindPage";
import Top from "./top/Top/Top";
import MainPage from "./body/MainPage";
import Botom from "./botom/Botom";


function App() {
    return (
        <div>
            <Top></Top>
            <MainPage></MainPage>
            <Botom></Botom>
        </div>
    );
}

export default App;
