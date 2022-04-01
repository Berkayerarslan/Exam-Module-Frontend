import React from 'react'
import { useTimer } from "react-timer-hook";

const Timer = ({ hours,minutes,seconds }) => {
    console.log(hours,minutes,seconds);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "20px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  )
}

export default Timer