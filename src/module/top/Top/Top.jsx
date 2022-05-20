import React from 'react';
import topCss from "./Top.module.css"
import FindPage from "../FindPage/FindPage";
import Dropdown from 'react-bootstrap/Dropdown'


function Top() {
    return (
        <div className={topCss.top}>
            <div className={`${topCss.center}, ${topCss.textDiv}`}>
                <p className={topCss.logoText}>FCS-AIRLINES</p>
            </div>
            <div className={topCss.center}>
                <FindPage></FindPage>
            </div>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                    Default Dropdown
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                    <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                    <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <img className={topCss.image} src="/images/peofile.png"/>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </div>
        </div>
    );
}

export default Top;