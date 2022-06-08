import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const ForgotPasswordPage = ({sessionForgot, setSessionForgot, setVisibleForgot}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate()

    useEffect(() => {
        setSessionForgot(searchParams.get("session"));
        setVisibleForgot(true)
        navigate("/")
    }, [sessionForgot]);
    return (
        <div>

        </div>
    );
};

export default ForgotPasswordPage;