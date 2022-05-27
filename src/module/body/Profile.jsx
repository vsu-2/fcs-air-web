import React, {useState} from 'react';
import cssPage from './Page.module.css'
import cssProfile from './Profile.module.css'
import {useParams} from "react-router-dom";

const Profile = ({setChangePasswordVisible}) => {
    const {id} = useParams()
    const [disabledBtn, setDisabled] = useState(true)

    function test() {
        console.log(id)
    }

    return (
        <div className={cssPage.page} onLoad={() => test()}>
            <div className={cssProfile.divContent}>
                <div className={cssProfile.divImage}>
                    <img className={cssProfile.image} src="/images/peofile.png"/>
                </div>
                <div>
                    <div className={cssProfile.divInput}>
                        <input placeholder={'your first name'}
                               className={cssProfile.input}
                               onChange={() => setDisabled(false)}/>
                        <input placeholder={'your second name'}
                               className={cssProfile.input}
                               onChange={() => setDisabled(false)}/>
                    </div>
                    <div className={cssProfile.divInput}>
                        <input placeholder={'your email'}
                               className={cssProfile.input}
                               onChange={() => setDisabled(false)}/>
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