import React, {useState} from 'react';
import LeftInput from "../../input/LeftTop/LeftInput";
import MiddleInput from "../../input/MiddleTop/MiddleInput";
import RightInput from "../../input/RightTop/RightInput";
import findPageCss from "./FindPage.module.css"
import { useNavigate } from "react-router-dom";


function FindPage({filter}) {

    const navigate = useNavigate()
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('Y')

    function setFromApi(value){
        setFrom(value)
    }

    function setToApi(value){
        setTo(value)
    }

    function setDateApi(value){
        setDate(value)
    }

    function setTypeApi(value){
        if(value === "Эконом"){
            setType("Y")
        }else {
            setType("Y")
        }
    }

    function setFilter(event){
        event.preventDefault()
        if(from !== '' && to !== '' && date !== ''){
            filter({from: from, to: to, date_to: date, class: type})
            navigate("/tickets")
        }
    }

    return (
        <div className={findPageCss.findPage}>
            <LeftInput placeholder={"Откуда?"} value={from} setValue={setFromApi}></LeftInput>
            <MiddleInput placeholder={"Куда?"} value={to} setValue={setToApi}></MiddleInput>
            <MiddleInput placeholder={"Когда?"} changeType={true} value={date} setValue={setDateApi}></MiddleInput>
            <RightInput placeholder={"Эконом"} setValue={setTypeApi}></RightInput>
            <button onClick={event => setFilter(event)} className={findPageCss.fromButton}>Найти</button>
        </div>
    );
}

export default FindPage;