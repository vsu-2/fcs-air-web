import React, {memo, useEffect, useState} from 'react';

const Slider = memo(
    ({ classes, label, onChange, value, ...sliderProps }) => {
        const [sliderVal, setSliderVal] = useState(0);
        const [mouseState, setMouseState] = useState(null);

        useEffect(() => {
            setSliderVal(value);
        }, [value]);

        const changeCallback = e => {
            setSliderVal(e.target.value);
        };

        useEffect(() => {
            if (mouseState === "up") {
                onChange(sliderVal);
            }
        }, [mouseState]);
        console.log("RENDER");
        return (
            <div className="range-slider">
                <p style={{margin: 0}}>{label}: {sliderVal}</p>
                <input
                    type="range"
                    value={sliderVal}
                    {...sliderProps}
                    className={`slider ${classes}`}
                    id="myRange"
                    onChange={changeCallback}
                    onMouseDown={() => setMouseState("down")}
                    onMouseUp={() => setMouseState("up")}
                />
            </div>
        );
    }
);

export default Slider;