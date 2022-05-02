import React from 'react';
import LeftInput from "./input/LeftTop/LeftInput";
import MiddleInput from "./input/MiddleTop/MiddleInput";
import RightInput from "./input/RightTop/RightInput";


function App() {
    return (
        <div>
            <LeftInput placeholder={"Откуда"}></LeftInput>
            <MiddleInput placeholder={"Откуда"}></MiddleInput>
            <RightInput placeholder={"Откуда"}></RightInput>
        </div>
    );
}

export default App;
