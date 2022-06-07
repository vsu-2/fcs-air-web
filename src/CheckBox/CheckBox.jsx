import React, {useState} from 'react';
import css from './checkBox.module.css'

const CheckBox = ({text, array, setArray, object}) => {

    const [checked, setChecked] = useState(false)

    function change(){
        if(checked){
           setChecked(false)
           setArray(array.filter(el => el !== object))
        }else {
            setChecked(true)
            console.log(array)
            setArray([object, ...array])
        }
        console.log(array)
    }

    return (
        <div className={css.checkBoxDiv}>
            <input className={css.checkBox} type={"checkbox"} onChange={change}/>
            <p className={css.text}>{text}</p>
        </div>
    );
};

export default CheckBox;