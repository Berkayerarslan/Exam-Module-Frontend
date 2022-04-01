import React, { useEffect, useState } from 'react'


const TimerDeneme = () => {
 const [time, settime] = useState(0)
 const [timeOn, settimeOn] = useState(false)

useEffect(() => {
  let interval = null;

  if(timeOn){
    interval = setInterval(()=>{
        settime(prev => prev + 10)
    },10)
  }
  else {
    clearInterval(interval);
  }

 return () => clearInterval(interval)
}, [timeOn])


  return (
    <div id='app'>
        <div>{time}</div>
        <div>
            <button onClick={() => settimeOn(true)}>start</button>
            <button onClick={() => settimeOn(false)}>stop</button>
            <button onClick={() => settimeOn(true)}>resume</button>
            <button onClick={() => settime(0)}>reset</button>
        </div>

    </div>
  )
}

export default TimerDeneme