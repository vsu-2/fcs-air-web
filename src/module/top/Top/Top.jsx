import React, {useState} from 'react';
import topCss from "./Top.module.css"
import FindPage from "../FindPage/FindPage";
import {Link} from "react-router-dom";


function Top({clickRegister, clickLogin}) {

    const [visible, setVisible] = useState(false)
    const [isClickOne, setClickOne] = useState(false)
    const [isClickTwo, setClickTwo] = useState(false)

    const rootClassesHover = [topCss.ulDrop]
    const rootClassesClickOne = [topCss.ulItemOne]
    const rootClassesClickTwo = [topCss.ulItemTwo]
    if (visible) {
        rootClassesHover.push(topCss.active)
    }

    if (isClickOne) {
        rootClassesClickOne.push(topCss.click)
    }

    if (isClickTwo) {
        rootClassesClickTwo.push(topCss.click)
    }


    return (
        <div className={topCss.top}>
            <Link to={"/"} className={topCss.link}>
                <div className={`${topCss.center}, ${topCss.textDiv}`}>
                    <p className={topCss.logoText}>FCS-AIRLINES</p>
                </div>
            </Link>
            <div className={topCss.center}>
                <FindPage></FindPage>
            </div>
            <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                <img className={topCss.image} src="/images/peofile.png"/>
                <ul className={rootClassesHover.join(' ')}>
                    <li
                        className={rootClassesClickOne.join(' ')}
                        onMouseDown={() => setClickOne(true)}
                        onMouseUp={() => setClickOne(false)}
                        onClick={() => clickLogin(true)}
                    >Login
                    </li>
                    <li
                        className={rootClassesClickTwo.join(' ')}
                        onMouseDown={() => setClickTwo(true)}
                        onMouseUp={() => setClickTwo(false)}
                        onClick={() => clickRegister(true)}
                    >Register
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Top;