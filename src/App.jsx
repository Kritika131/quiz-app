import { useEffect, useState } from "react"
import Quiz from "./components/Quiz"
import { jsQuizz } from "./quizData"


function App() {

  // const [questionss,setQuestions] = useState([]);

//   useEffect(()=>{
//     getQuestions()
//  },[]);

  // const getQuestions = async ()=>{
  //   try{ 
  //      const response = await fetch("https://644982a3e7eb3378ca4ba471.mockapi.io/questions")
       
  //      const result = await response.json();
  //      setQuestions(result)
  //      console.log(result);

  //     console.log(questionss);

  //   } catch(err){
  //     console.log(err);
  //   }
  // }
  
  return (
    <>
      <div>
        <Quiz questions = {jsQuizz.questions} />
      </div>
    
    </>
  )
}

export default App
