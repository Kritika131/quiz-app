import React, { useEffect, useRef, useState } from 'react'
import "../styles/answerTimer.css"

const AnswerTimer = ({duration,onTimeUp}) => {

  const [counter, setCounter ] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0)
  const intervalRef = useRef();

  useEffect(()=>{
     intervalRef.current = setInterval(()=>{
      setCounter((pre)=>pre+1)
     },1000);

     return ()=>clearInterval(intervalRef.current);
  },[])

  useEffect(()=>{
    setProgressLoaded(100 * (counter/duration));
    if(counter === duration ){
      clearInterval(intervalRef.current);
      setTimeout(()=>{
         onTimeUp()
      },1000)
    }
  },[counter])
   
  return (
    <div className='answer-timer-container'>
        <div className="progress" style={{width: `${progressLoaded}%`, backgroundColor:`${progressLoaded <50 ? 'lightgreen' : progressLoaded < 70 ? '#6e7006' : 'rgb(7, 43, 16)'}`}}>
        
        </div>
    </div>
  )
}

export default AnswerTimer