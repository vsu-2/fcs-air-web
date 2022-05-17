import React from 'react';
import topCss from "./Top.module.css"
import FindPage from "../FindPage/FindPage";


function Top() {
    return (
        <div className={topCss.top}>
            <div className={`${topCss.center}, ${topCss.textDiv}`}>
                <p className={topCss.logoText}>FCS-AIRLINES</p>
            </div>
            <div className={topCss.center}>
                <FindPage></FindPage>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Top;