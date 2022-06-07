import React, {useState} from 'react';
import cssBody from "./Page.module.css";
import Time from "../time/Time";
import Api from "../Api/Api";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Context/context";
import {AxiosResponse} from "axios";

const FavoritePage = () => {

    const auth = useContext(AuthContext);

    useEffect(() => {
        get();
    }, [auth]);

    const [favorites, setFavorites] = useState([])

    function get(){
        Api.getFavoritesSessionMe(auth.auth.token).then((response: AxiosResponse) => {
            setFavorites(response.data.results)
        });
    }

    function render(){
        return favorites.map((el, index) => (
            el.trips.map((el2, index) =>(
                <p className={cssBody.about2}>{el2.origin.title} -- {el2.destination.title}  {el2.date}</p>
            ))
        ))
    }

    return (
        <div>
            <div className={cssBody.page}>
                <Time></Time>
                <div className={cssBody.aboutDiv}>
                    {render()}
                </div>
            </div>
        </div>
    );
};

export default FavoritePage;