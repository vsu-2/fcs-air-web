import React, {useEffect} from 'react';
import cssBody from "./Page.module.css";
import Time from "../time/Time";
import {useSearchParams} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../Context/context";

const Activate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = useContext(AuthContext);

    useEffect(() => {
        setToken()
    }, []);

    function setToken(){
        let token = searchParams.get("token")
        auth.setAuth({isAuth: true, token: token})
    }

    return (
        <div className={cssBody.page}>
            <Time></Time>
            <div className={cssBody.aboutDiv}>
                <p className={cssBody.about}>Спасибо за активацию аккаунта! Можете пользоваться сайтом!</p>
            </div>
        </div>
    );
};

export default Activate;