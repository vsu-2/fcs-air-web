import React, {useState} from 'react';
import topCss from "./Top.module.css"
import FindPage from "../FindPage/FindPage";


function Top() {

    const [visible, setVisible] = useState(false)
    const [isClickOne, setClickOne] = useState(false)
    const [isClickTwo, setClickTwo] = useState(false)

    const rootClassesHover = [topCss.ulDrop]
    const rootClassesClickOne = [topCss.ulItemOne]
    const rootClassesClickTwo = [topCss.ulItemTwo]
    if(visible){
        rootClassesHover.push(topCss.active)
    }

    if(isClickOne){
        rootClassesClickOne.push(topCss.click)
    }

    if(isClickTwo){
        rootClassesClickTwo.push(topCss.click)
    }




    return (
        <div className={topCss.top}>
            <div className={`${topCss.center}, ${topCss.textDiv}`}>
                <p className={topCss.logoText}>FCS-AIRLINES</p>
            </div>
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
                    >Login</li>
                    <li
                        className={rootClassesClickTwo.join(' ')}
                        onMouseDown={() => setClickTwo(true)}
                        onMouseUp={() => setClickTwo(false)}
                    >Register</li>
                </ul>
            </div>
        </div>
    );
}

export default Top;