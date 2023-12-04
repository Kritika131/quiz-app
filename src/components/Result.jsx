import React, { useEffect, useState } from 'react'
import '../styles/quiz.css'
import '../styles/result.css'

const Result = ({questions,result,onTryAgain}) => {

  const [name,setName] = useState('')
  const [highScore, setHighScore] = useState([]);
  const [showScore , setShowScore] = useState(false);

  useEffect(()=>{
     setHighScore(JSON.parse(localStorage.getItem("highScore")) || [])
  },[])

    const handleSave =()=>{
      const score = {
        name,
        score:result.score
      }

      const newHighScore = [...highScore,score].sort((a,b)=>b.score-a.score);
      console.log("newHighScore ",newHighScore);
      setHighScore(newHighScore);
      setShowScore(true);
      localStorage.setItem("highScore",JSON.stringify(newHighScore))
    }

    const handleTryAgain = ()=>{
       setShowScore(false)
       setHighScore([]);
       onTryAgain();

    }


  return (
    <div className="result">
    <h3>Result</h3>
    <p>Total Questions: <span>{questions.length}</span></p>
    <p>Total Score: <span>{result.score}</span></p>
    <p>Correct Answers: <span>{result.correctAnswers}</span></p>
    <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
    <button onClick={handleTryAgain}>Try again</button>
    {!showScore ? <>
      <h4>Enter your name below to <br/>save your score!</h4>
      <input type="text" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)}  />

      <button onClick={handleSave}>Save</button>
    </>  : <>
    <table>
      <thead>
        <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {highScore.map((score,i)=>{
          return (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          )
        })}
        
      </tbody>
    </table>
    </>}
    
  </div>
  )
}

export default Result