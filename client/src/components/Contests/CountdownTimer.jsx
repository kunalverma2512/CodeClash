import React from "react";
import Countdown from 'react-countdown';
const CountdownTimer = ({ startTime }) => {
  return (
    <div>
      <Countdown
        date={new Date(startTime)}
        renderer={({ days, hours, minutes, seconds, completed }) =>
          completed ? (
            <span>Started</span>
          ) : (
            <span>
              {days}d {hours}h {minutes}m {seconds}s
            </span>
          )
        }
      />
    </div>
  );
};

export default CountdownTimer;
