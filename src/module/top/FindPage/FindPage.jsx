import React from 'react';
import LeftInput from "../../input/LeftTop/LeftInput";
import MiddleInput from "../../input/MiddleTop/MiddleInput";
import RightInput from "../../input/RightTop/RightInput";
import findPageCss from "./FindPage.module.css"


function FindPage() {
    return (
        <div className={findPageCss.findPage}>
            <LeftInput placeholder={"Откуда?"}></LeftInput>
            <MiddleInput placeholder={"Куда?"}></MiddleInput>
            <MiddleInput placeholder={"Когда?"} changeType={true}></MiddleInput>
            <MiddleInput placeholder={"Обратно?"} changeType={true}></MiddleInput>
            <RightInput placeholder={"Эконом"}></RightInput>
        </div>
    );
}

export default FindPage;