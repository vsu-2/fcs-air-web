import React, {useEffect, useState} from 'react';
import Time from "../time/Time";
import Ticket from "../tickets/Ticket";
import cssPage from './Page.module.css'
import cssTicketPage from './TicketPage.module.css'
import Api from "../Api/Api";
import {AxiosError, AxiosResponse} from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import ticket from "../tickets/Ticket";
import Loader from "../Loader/Loader";

const TicketPage = ({filter, setFilter}) => {

    useEffect(() => {
        start_session();
    }, [filter]);

    const [loadedTickets, setLoadedTickets] = useState(false)
    const [tickets, setTicket] = useState([])
    const [founded, setFounded] = useState(true)
    const [timer, setTimer] = useState()

    function start_session() {
        console.log("few")
        setFounded(true)
        setLoadedTickets(true)
        if(filter.from !== '' && filter.to !== '' && filter.data !== '') {
            Api.getGeoCities(filter.from).then((response_from: AxiosResponse) => {
                let cities_from = response_from.data.results
                Api.getGeoCities(filter.to).then((response_to: AxiosResponse) => {
                    let cities_to = response_to.data.results
                    if (cities_from.length !== 0 && cities_to.length !== 0) {
                        const json = JSON.stringify({
                            trips: [
                                {
                                    origin: cities_from[0].id,
                                    destination: cities_to[0].id,
                                    date: filter.date_to
                                }
                            ],
                            passengers: 1,
                            flight_class: filter.class,
                        })
                        Api.postTicketsSession(json).then((response_session: AxiosResponse) => {
                            let session_id = response_session.data.session_id
                            console.log(session_id)
                            getTicket(session_id)
                        })
                    } else {
                        setFounded(false)
                        setLoadedTickets(false)
                    }
                })
            })
        }else{
            setFounded(false)
        }
    }

    function getTicket(sessionId) {
        let isRunning = true;
        clearTimeout(timer)
        let timeout = setTimeout(() => {
            Api.getTicketsSessionsIdTickets(sessionId).then((response: AxiosResponse) => {
                isRunning = response.data.in_progress
                setTicket(response.data.results)
                if(response.data.results.length === 0){
                    setFounded(false)
                }
                setLoadedTickets(false)
            })
        }, 1000)
        setTimer(timer)
        if (!isRunning) {
            clearTimeout(timer)
        }
    }

    function render_tickets() {
        if(founded) {
            if(!loadedTickets) {
                return tickets.map((el) =>
                    <div className={cssTicketPage.ticket}>
                        <Ticket
                            cost={el.best_offer.price}
                            segments={el.trips[0].segments}
                            companyName={el.trips[0].segments[0].marketing_airline.code}
                            timeFrom={el.trips[0].segments[0].departure_time.split("T")[0] + " " + el.trips[0].segments[0].departure_time.split("T")[1].split("Z")[0]}
                            timeTo={el.trips[0].segments[0].arrival_time.split("T")[0] + " " + el.trips[0].segments[0].arrival_time.split("T")[1].split("Z")[0]}
                            air={el.trips[0].segments[0].departure.title + " " + el.trips[0].segments[0].departure.city.title}
                        >
                        </Ticket>
                    </div>
                )
            }else {
                return <Loader></Loader>
            }
        } else {
            return <div className={cssTicketPage.textDiv}><p className={cssTicketPage.text}>Билеты не найдены</p></div>
        }
    }

    return (
        <div className={cssPage.page}>
            <Time></Time>
            {/*<div className={cssTicketPage.ticket}>*/}
            {/*    <Ticket cost={'10000'} companyName={"U6"} timeFrom={"10"} timeTo={"10"} air={"Внуково Москва"}></Ticket>*/}
            {/*</div>*/}
            {/*<div className={cssTicketPage.ticket}>*/}
            {/*    <Ticket cost={'10000'} companyName={"U6"} timeFrom={"10"} timeTo={"10"} air={"Внуково Москва"}></Ticket>*/}
            {/*</div>*/}
            {render_tickets()}
            <div className={cssTicketPage.jokeDiv}></div>
        </div>
    );
};

export default TicketPage;