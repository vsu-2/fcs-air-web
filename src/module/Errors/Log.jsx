import React, {useState} from 'react';
import cssError from './Log.module.css';

const Log = ({isNone, value}) => {

    const css = [cssError.div]
    if(isNone){
        css.push(cssError.block)
    }

    return (
        <div className={css.join(' ')}>
            <p>
                {value}
            </p>
        </div>
    );
};

export default Log;