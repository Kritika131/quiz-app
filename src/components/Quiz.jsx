import React, { useState } from "react";
import { resultInitialState } from "../quizData";
import "../styles/quiz.css"
import AnswerTimer from "./AnswerTimer";
import Result from "./Result";

const Quiz = ({ questions }) => {
  const [curQuestion, setcurQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [inputAnswer, setInputAnswer] = useState('');
  
  const { question, choices, correctAnswer,type } = questions[curQuestion];

  const [showAnswerTimer , setShowAnswerTimer] = useState(true);

  const handleAnswer = (choice, idx) => {
    setAnswerIdx(idx);
    if (choice === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalanswer) => {
    setAnswerIdx(null);
    setInputAnswer('')
    setShowAnswerTimer(false)
    setResult((prev) =>
      finalanswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (curQuestion !== questions.length - 1) {
      setcurQuestion(curQuestion + 1);
    } else {
      setcurQuestion(0);
      setShowResult(true);
    }
    setTimeout(() => {
      setShowAnswerTimer(true);
     
    });
  };

  const onTryAgain=()=>{
    setResult(resultInitialState);
    setShowResult(false);
    setInputAnswer('')
    
  }

  const handleTimeUp = ()=>{
   setAnswer(false);
   onClickNext(false);
   
  
   
  }

  const handleInputChange =(e)=>{
    setInputAnswer(e.target.value);

    if(e.target.value === correctAnswer){
      setAnswer(true);
    } else {
      setAnswer(false)
    }

  }

  const getAnswerUI = ()=>{

    if(type == 'FIB'){
      return <input value = {inputAnswer} onChange={handleInputChange}/>;
    }

    return ( <ul className="">
    {choices &&
      choices.map((item, i) => (
        <li
          onClick={() => handleAnswer(item, i)}
          key={i}
          className={answerIdx === i ? "selected-answer" : null}
        >
          {item}
        </li>
      ))}
  </ul>)
  }


  
  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
        {
          showAnswerTimer &&  (<AnswerTimer duration = {5} onTimeUp ={handleTimeUp}/>
          )
        }
        
          <span className="active-question">{curQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>

         {getAnswerUI()}
          <div className="footer">
            <button onClick={()=>onClickNext(answer)} disabled={answerIdx === null  && !inputAnswer}>
              {curQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
         <Result questions={questions} onTryAgain={onTryAgain} result={result}/>
      )}
    </div>
  );
};

export default Quiz;
