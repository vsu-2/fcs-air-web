import React from 'react';
import cssBottom from './Botom.module.css'

const Botom = () => {
    return (
        <div className={cssBottom.bottomPage}>
            <hr className={cssBottom.hr}></hr>
            <div className={cssBottom.div}>
                <div className={cssBottom.flex}>
                    <p className={cssBottom.vk}>VK</p>
                    <p>Телефон</p>
                </div>
                <div className={cssBottom.flex}>
                    <p className={cssBottom.telegram}>Telegram</p>
                    <p>Адрес</p>
                </div>
            </div>
        </div>
    );
};

export default Botom;