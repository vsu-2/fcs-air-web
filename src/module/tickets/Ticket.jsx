import React, {useState} from 'react';
import cssTicket from './ticket.module.css'
import Api from "../Api/Api";
import {AxiosResponse} from "axios";

const Ticket = ({cost, companyName, timeTo, timeFrom, air, segments, trips, results, sessionId}) => {

    function getImgSrc(segment) {
        return "https://pics.avs.io/al_square/32/32/" + segment.marketing_airline.code + ".png"
    }

    function getLink(event){
        event.preventDefault()
        Api.getTicketsSessionsOffers(sessionId, results.best_offer.id).then((response: AxiosResponse) => {
            window.open(response.data.link);
        });
    }

    function render_img(){
        return segments.map((el, index) =>
                <img className={cssTicket.image} src={getImgSrc(el)}/>
            )
    }

    function render_segments(){
        return segments.map((el, index) =>
            <div>
                <img className={cssTicket.image} src={getImgSrc(el)}/>
                <p className={cssTicket.companyName}>{el.marketing_airline.title}</p>
                <p className={cssTicket.infoText2}>{el.departure.title} {el.departure.city.title} -- {el.arrival.title} {el.arrival.city.title}</p>
            </div>
        )
    }

    return (
        <div className={cssTicket.mainDiv}>
            <div className={cssTicket.leftDiv}>
                <p>{cost}₽</p>
                <button className={cssTicket.button} onClick={event => getLink(event)}>Enter</button>
            </div>
            <div>
                <div>
                    {render_img()}
                    <p className={cssTicket.companyName}>{results.best_offer.title}</p>
                </div>
                <div className={cssTicket.infoDiv}>
                    <p className={cssTicket.infoText}>Время отправления: {timeFrom}</p>
                    <p className={cssTicket.infoText}>Время прибытия: {timeTo}</p>
                    {render_segments()}
                </div>
            </div>
        </div>
    );
};

export default Ticket;