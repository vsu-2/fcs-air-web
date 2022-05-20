import React, {useState} from 'react';
import cssTime from './Time.module.css'

const Time = () => {
    const [time, setTime] = useState(getDateTime())

    function getDateTime() {
        const date = new Date();
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }

    function updateTime() {
        setTime(getDateTime())
    }

    function start() {
        setInterval(updateTime, 1000)
    }

    return (
        <div className={cssTime.timeDiv} onLoad={start()}>
            <p className={cssTime.time}>{time}</p>
        </div>
    );
};
export default Time;