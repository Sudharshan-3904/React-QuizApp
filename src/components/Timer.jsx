import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ duration, onTimeUp }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        if (time > 0) {
            const timerId = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            onTimeUp();
        }
    }, [time, onTimeUp]);

    return (
        <div className="timer">
            Time left: {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
            {time % 60}
        </div>
    );
};

Timer.propTypes = {
    duration: PropTypes.number.isRequired,
    onTimeUp: PropTypes.func.isRequired,
};

export default Timer;
