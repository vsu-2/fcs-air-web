import React from 'react';
import cssBody from './MainPage.module.css'
import Time from "../time/Time";

const MainPage = () => {
    return (
        <div className={cssBody.mainPage}>
            <Time></Time>
            <div className={cssBody.aboutDiv}>
                <p className={cssBody.about}>About us</p>
            </div>
        </div>
    );
};

export default MainPage;