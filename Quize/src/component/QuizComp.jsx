import Timer from "./Timer"
import AnswerBox from "./AnswerBox"
import { useState } from "react"
import QUSTION from "../qustion.js"
export default function QuizComp({idx, handleSkip, handleSelect}){
    const [userAnswer, setUserAnswer] = useState({
        selectedAnswer:'',
        isTrue:null
    })
    let timer = 10000
    if(userAnswer.selectedAnswer){
        timer = 1000
    }
    if(userAnswer.isTrue !== null){
        timer = 2000
    }
    const handleSelectAnswer = (answer) =>{
        setUserAnswer({
            selectedAnswer:answer,
            isTrue:null
        });

        setTimeout(()=>{
            setUserAnswer({
                selectedAnswer:answer,
                isTrue:QUSTION[idx].answer[0] === answer
            })

            setTimeout(()=>{
                handleSelect(answer);
            },2000)
        },1000)
    }

    let isCorrect = ''

    if(userAnswer.selectedAnswer && userAnswer.isTrue !== null){
        isCorrect = userAnswer.isTrue ? 'correct' : 'wrong'
    }else if(userAnswer.selectedAnswer){
        isCorrect = 'answered'
    }
    return(
        <div id='question'>
                <Timer key={timer} 
                Timeout={timer} 
                onTimeout={isCorrect === '' ? handleSkip : null} 
                mode={isCorrect}/>
                <h2>{QUSTION[idx].text}</h2>
                <AnswerBox
                    isCorrect={isCorrect}
                    answers={QUSTION[idx].answer} 
                    user={userAnswer.selectedAnswer} 
                    handleSelectAnswer={handleSelectAnswer}>
                </AnswerBox>
            </div>
    )
}