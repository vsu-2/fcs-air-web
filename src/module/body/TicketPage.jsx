import React, {useEffect, useMemo, useState} from 'react';
import Time from "../time/Time";
import Ticket from "../tickets/Ticket";
import cssPage from './Page.module.css'
import cssTicketPage from './TicketPage.module.css'
import Api from "../Api/Api";
import {AxiosError, AxiosResponse} from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import ticket from "../tickets/Ticket";
import Loader from "../Loader/Loader";
import {MultiSelect} from 'primereact/multiselect';
import CheckBox from "../../CheckBox/CheckBox";
import Slider from "../Slider/Slider";

const TicketPage = ({filter, setFilter}) => {

        useEffect(() => {
            start_session();
        }, [filter]);

        const [displayTravelTime, setDisplayTravelTime] = useState({display: "none", symbol: "∨"})
        const [displayTransfers, setDisplayTransfers] = useState({display: "none", symbol: "∨"})
        const [displayAirlines, setDisplayAirlines] = useState({display: "none", symbol: "∨"})
        const [displayAirports, setDisplayAirports] = useState({display: "none", symbol: "∨"})
        const [displayOffers, setDisplayOffers] = useState({display: "none", symbol: "∨"})
        const [displayStartTime, setDisplayStartTime] = useState({display: "none", symbol: "∨"})
        const [displayEndTime, setDisplayEndTime] = useState({display: "none", symbol: "∨"})

        const [loadedTickets, setLoadedTickets] = useState(false)
        const [tenLoadedTickets, setTenLoadedTickets] = useState(false)
        const [tickets, setTicket] = useState([])
        const [founded, setFounded] = useState(true)
        const [timer, setTimer] = useState()
        const [sessionId, setSessionId] = useState('')
        const [countTicket, setCountTicket] = useState(0)
        const [page, setPage] = useState(1)

        const [transfers, setTransfers] = useState([])
        const [selectedTransfers, setSelectedTransfers] = useState([])
        const [airlines, setAirLines] = useState([])
        const [selectedAirlines, setSelectedAirlines] = useState([])
        const [airports, setAirports] = useState([])
        const [selectedAirports, setSelectedAirports] = useState([])
        const [offers, setOffers] = useState([])
        const [selectedOffers, setSelectedOffers] = useState([])


        const [sliderTravelTimeMin, setSliderTravelTimeMin] = useState(-1)
        const [sliderSettingTravelTimeMin, setSliderSettingTravelTimeMin] = useState({min: 0, max: 10})
        const [sliderTravelTimeMax, setSliderTravelTimeMax] = useState(-1)
        const [sliderSettingTravelTimeMax, setSliderSettingTravelTimeMax] = useState({min: 0, max: 10})
        const [sliderStartTimeMax, setSliderStartTimeMax] = useState(23)
        const [sliderSettingStartTimeMax, setSliderSettingStartTimeMax] = useState({min: 0, max: 23})
        const [sliderStartTimeMin, setSliderStartTimeMin] = useState(0)
        const [sliderSettingStartTimeMin, setSliderSettingStartTimeMin] = useState({min: 0, max: 23})
        const [sliderEndTimeMax, setSliderEndTimeMax] = useState(23)
        const [sliderSettingEndTimeMax, setSliderSettingEndTimeMax] = useState({min: 0, max: 23})
        const [sliderEndTimeMin, setSliderEndTimeMin] = useState(0)
        const [sliderSettingEndTimeMin, setSliderSettingEndTimeMin] = useState({min: 0, max: 23})

        const sliderPropsTimeMin = useMemo(
            () => ({
                min: sliderSettingTravelTimeMin.min,
                max: sliderSettingTravelTimeMin.max,
                value: sliderTravelTimeMin,
                step: 1,
                label: "Минимальное время полета",
                onChange: e => setSliderTravelTimeMin(e)
            }),
            [sliderTravelTimeMin]
        );

        const sliderPropsTimeMax = useMemo(
            () => ({
                min: sliderSettingTravelTimeMax.min,
                max: sliderSettingTravelTimeMax.max,
                value: sliderTravelTimeMax,
                step: 1,
                label: "Максимальное время полета",
                onChange: e => setSliderTravelTimeMax(e)
            }),
            [sliderTravelTimeMax]
        );

        const sliderPropsStartTimeMax = useMemo(
            () => ({
                min: sliderSettingStartTimeMax.min,
                max: sliderSettingStartTimeMax.max,
                value: sliderStartTimeMax,
                step: 1,
                label: "Максимальное время отправления",
                onChange: e => setSliderStartTimeMax(e)
            }),
            [sliderStartTimeMax]
        );

        const sliderPropsStartTimeMin = useMemo(
            () => ({
                min: sliderSettingStartTimeMin.min,
                max: sliderSettingStartTimeMin.max,
                value: sliderStartTimeMin,
                step: 1,
                label: "Минимальное время отправления",
                onChange: e => setSliderStartTimeMin(e)
            }),
            [sliderStartTimeMin]
        );

        const sliderPropsEndTimeMax = useMemo(
            () => ({
                min: sliderSettingEndTimeMax.min,
                max: sliderSettingEndTimeMax.max,
                value: sliderEndTimeMax,
                step: 1,
                label: "Максимальное время прибытия",
                onChange: e => setSliderEndTimeMax(e)
            }),
            [sliderEndTimeMax]
        );

        const sliderPropsEndTimeMin = useMemo(
            () => ({
                min: sliderSettingEndTimeMin.min,
                max: sliderSettingEndTimeMin.max,
                value: sliderEndTimeMin,
                step: 1,
                label: "Минимальное время отправления",
                onChange: e => setSliderEndTimeMin(e)
            }),
            [sliderEndTimeMin]
        );

        function loadFilter(session_id) {
            Api.getTicketsSessionsIdFilters(session_id).then((response: AxiosResponse) => {
                console.log(transfers)

                setTransfers(response.data.transfers)
                setAirLines(response.data.airlines)
                setAirports(response.data.airports)
                setOffers(response.data.offers)

                let minMinutsInAir = timeToMinuts(response.data.travel_time_range.min)
                let maxMinutsInAir = timeToMinuts(response.data.travel_time_range.max)

                setSliderSettingTravelTimeMin({
                    min: minMinutsInAir,
                    max: maxMinutsInAir
                })
                setSliderTravelTimeMin(minMinutsInAir)

                setSliderSettingTravelTimeMax({
                    min: minMinutsInAir,
                    max: maxMinutsInAir
                })
                setSliderTravelTimeMax(maxMinutsInAir)
            })
        }

        function timeToMinuts(time) {
            let arrayTime = String(time).split(" ")
            let min = 0;
            if (arrayTime.length > 1) {
                arrayTime = [arrayTime[0], ...arrayTime[1].split(":")]
                min = Number(arrayTime[2]);
                min += Number(arrayTime[1]) * 60;
                min += Number(arrayTime[0]) * 60 * 24;
            } else {
                arrayTime = String(time).split(':')
                min = Number(arrayTime[1]);
                min += Number(arrayTime[0]) * 60;
            }

            return min;
        }

        function start_session() {
            console.log("few")
            setFounded(true)
            setLoadedTickets(true)
            if (filter.from !== '' && filter.to !== '' && filter.data !== '') {
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
                                setSessionId(session_id)
                                loadFilter(session_id)
                                getTicket(session_id)
                            })
                        } else {
                            setFounded(false)
                            setLoadedTickets(false)
                        }
                    })
                })
            } else {
                setFounded(false)
            }
        }

        function getTicket(session_id, load_page=1) {
            setPage(1)
            let isRunning = true;
            clearTimeout(timer)
            let timeout = setTimeout(() => {
                Api.getTicketsSessionsIdTickets(session_id, selectedTransfers,
                    sliderTravelTimeMin, sliderTravelTimeMax,
                    sliderStartTimeMax, sliderStartTimeMin,
                    sliderEndTimeMax, sliderEndTimeMin,
                    load_page, selectedAirlines,
                    selectedAirports, selectedOffers).then((response: AxiosResponse) => {
                    isRunning = response.data.in_progress
                    setTicket(response.data.results)
                    setCountTicket(response.data.count)
                    if (response.data.results.length === 0) {
                        setFounded(false)
                    } else {
                        setPage(page + 1)
                        setFounded(true)
                    }
                    setLoadedTickets(false)
                    if (!isRunning) {
                        clearTimeout(timer)
                    }
                })
            }, 1000)
            setTimer(timeout)
        }

        function render_tickets() {
            if (founded) {
                if (!loadedTickets) {
                    return tickets.map((el, index) =>
                        <div className={cssTicketPage.ticket}>
                            <Ticket
                                sessionId={sessionId}
                                results={el}
                                trips={el.trips}
                                cost={el.best_offer.price}
                                segments={el.trips[0].segments}
                                companyName={el.trips[0].segments[0].marketing_airline.code}
                                timeFrom={el.trips[0].start_time.split("T")[0] + " " + el.trips[0].start_time.split("T")[1].split("Z")[0]}
                                timeTo={el.trips[0].end_time.split("T")[0] + " " + el.trips[0].end_time.split("T")[1].split("Z")[0]}
                                air={el.trips[0].segments[0].departure.title + " " + el.trips[0].segments[0].departure.city.title}
                            >
                            </Ticket>
                        </div>
                    )
                } else {
                    return <Loader></Loader>
                }
            } else {
                return <div className={cssTicketPage.textDiv}><p className={cssTicketPage.text}>Билеты не найдены</p></div>
            }
        }

        function load10Tickets(session_id) {
            setTenLoadedTickets(true)
            setPage(page + 1)
            let isRunning = true;
            clearTimeout(timer)
            let timeout = setTimeout(() => {
                Api.getTicketsSessionsIdTickets(session_id, selectedTransfers,
                    sliderTravelTimeMin, sliderTravelTimeMax,
                    sliderStartTimeMax, sliderStartTimeMin,
                    sliderEndTimeMax, sliderEndTimeMin,
                    page, selectedAirlines,
                    selectedAirports, selectedOffers).then((response: AxiosResponse) => {
                    isRunning = response.data.in_progress
                    setTicket([...tickets, ...response.data.results])
                    setCountTicket(response.data.count)
                    setTenLoadedTickets(false)
                    if (!isRunning) {
                        clearTimeout(timer)
                    }
                })
            }, 1000)
            setTimer(timeout)
        }

        function clickEnter(e) {
            e.preventDefault()
            setPage(0)
            getTicket(sessionId)
        }

        function setDisplay(setDisplayFunc, display) {
            console.log("dada")
            if (display.display === "block") {
                setDisplayFunc({display: "none", symbol: "∨"})
            } else {
                setDisplayFunc({display: "block", symbol: ">"})
            }
        }

        function renderButton() {
            if ((page + 1) * 10 < countTicket && !loadedTickets) {
                return <div>
                    <button className={cssTicketPage.tenButton} onClick={() => load10Tickets(sessionId)}>Загрузить ещё 10...</button>
                </div>
            }
        }

        function renderLoader() {
            if(tenLoadedTickets){
                return <Loader></Loader>
            }
        }



        return (
            <div className={cssPage.page}>
                <div className={cssTicketPage.hiddenDiv}>
                    <div className={cssTicketPage.divFilter}>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayTransfers, displayTransfers)}>
                                Количество пересадок {displayTransfers.symbol}</p>
                            <div style={{display: displayTransfers.display}}>
                                {transfers.map((transfer, index) =>
                                    <CheckBox text={transfer} object={transfer} array={selectedTransfers}
                                              setArray={setSelectedTransfers}></CheckBox>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayAirlines, displayAirlines)}>
                                Авиакомпании {displayAirlines.symbol}</p>
                            <div style={{display: displayAirlines.display}}>
                                {airlines.map((airlane, index) =>
                                    <CheckBox text={airlane.title} object={airlane} array={selectedAirlines}
                                              setArray={setSelectedAirlines}></CheckBox>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayAirports, displayAirports)}>
                                Аэропорты {displayAirports.symbol}</p>
                            <div style={{display: displayAirports.display}}>
                                {airports.map((airport, index) =>
                                    <CheckBox text={airport.title} object={airport} array={selectedAirports}
                                              setArray={setSelectedAirports}></CheckBox>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayOffers, displayOffers)}>
                                Агенства {displayOffers.symbol}</p>
                            <div style={{display: displayOffers.display}}>
                                {offers.map((offer, index) =>
                                    <CheckBox text={offer.title} object={offer} array={selectedOffers}
                                              setArray={setSelectedOffers}></CheckBox>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayTravelTime, displayTravelTime)}>Время в
                                пути {displayTravelTime.symbol}</p>
                            <div style={{display: displayTravelTime.display}}>
                                <Slider {...sliderPropsTimeMin}></Slider>
                                <Slider {...sliderPropsTimeMax}></Slider>
                            </div>
                        </div>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayStartTime, displayStartTime)}>
                                Время отправления {displayStartTime.symbol}</p>
                            <div style={{display: displayStartTime.display}}>
                                <Slider {...sliderPropsStartTimeMax}></Slider>
                                <Slider {...sliderPropsStartTimeMin}></Slider>
                            </div>
                        </div>
                        <div>
                            <p className={cssTicketPage.unselectable}
                               onClick={() => setDisplay(setDisplayEndTime, displayEndTime)}>
                                Время прибытия {displayEndTime.symbol}</p>
                            <div style={{display: displayEndTime.display}}>
                                <Slider {...sliderPropsEndTimeMax}></Slider>
                                <Slider {...sliderPropsEndTimeMin}></Slider>
                            </div>
                        </div>
                        <div>
                            <button className={cssTicketPage.fromButton} onClick={clickEnter}>Применить</button>
                        </div>
                    </div>
                </div>
                <Time></Time>
                {render_tickets()}
                {renderLoader()}
                {renderButton()}
                <div className={cssTicketPage.jokeDiv}></div>
            </div>
        );
    }
;

export default TicketPage;