import React, {useState, useContext} from 'react';
import cssPage from './Page.module.css'
import cssProfile from './Profile.module.css'
import {useParams} from "react-router-dom";
import Api from "../Api/Api";
import {AuthContext} from "../Context/context";
import {AxiosResponse} from "axios";

const Profile = ({setChangePasswordVisible, visible}) => {
    const {id} = useParams()
    const [disabledBtn, setDisabled] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const auth = useContext(AuthContext);

    function change(func, value){
        setDisabled(false)
        func(value)
    }

    function sendPatch(e){
        e.preventDefault()
        const json = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
        })

        Api.patchMe(json, auth.auth.token).then((response: AxiosResponse) => {
            init()
        }).catch(() => {visible("Неизвестная ошибка!")})
    }

    function init() {
        console.log(id)
        let token = auth.auth.token
        let response = Api.getMe(token)
        response.then((response: AxiosResponse) => {
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
        })
    }

    return (
        <div className={cssPage.page} onLoad={() => init()}>
            <div className={cssProfile.divContent}>
                <div className={cssProfile.divImage}>
                    <img className={cssProfile.image} src="/images/peofile.png"/>
                </div>
                <div>
                    <div className={cssProfile.divInput}>
                        <input placeholder={'your first name'}
                               className={cssProfile.input}
                               value={firstName}
                               onChange={e => change(setFirstName, e.target.value)}/>
                        <input placeholder={'your second name'}
                               className={cssProfile.input}
                               value={lastName}
                               onChange={e => change(setLastName, e.target.value)}/>
                    </div>
                </div>
            </div>
            <div onClick={() => setChangePasswordVisible(true)}>
                <p className={cssProfile.change}>Change Password</p>
            </div>
            <div>
                <button disabled={disabledBtn} type={'submit'} className={cssProfile.button}>Save</button>
            </div>
        </div>
    );
};

export default Profile;