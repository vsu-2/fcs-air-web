import React from 'react';
import cssTicket from './ticket.module.css'

const Ticket = ({cost, companyName, timeTo, timeFrom, air, segments}) => {

    function getImgSrc() {
        return "https://pics.avs.io/al_square/65/65/" + segments[0].marketing_airline.code + ".png"
    }

    return (
        <div className={cssTicket.mainDiv}>
            <div className={cssTicket.leftDiv}>
                <p>{cost}₽</p>
                <button className={cssTicket.button}>Enter</button>
            </div>
            <div>
                <div>
                    <img className={cssTicket.image} src={getImgSrc()}/>
                    <p className={cssTicket.companyName}>{segments[0].marketing_airline.title}</p>
                </div>
                <div className={cssTicket.infoDiv}>
                    <p className={cssTicket.infoText}>Время отправления: {timeFrom}</p>
                    <p className={cssTicket.infoText}>Время прибытия: {timeTo}</p>
                    <p className={cssTicket.infoText}>Аэропорт: {air}</p>
                </div>
            </div>
        </div>
    );
};

export default Ticket;