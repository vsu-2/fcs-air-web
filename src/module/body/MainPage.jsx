import React from 'react';
import cssBody from './Page.module.css'
import Time from "../time/Time";

const MainPage = () => {
    return (
        <div className={cssBody.page}>
            <Time></Time>
            <div className={cssBody.aboutDiv}>
                <p className={cssBody.about}>About us</p>
            </div>
        </div>
    );
};

export default MainPage;