import { useCallback, useState } from 'react'
import QUSTION from '../qustion.js'
import EndImg from '../assets/quiz-complete.png'
import Timer from './Timer.jsx';
import AnswerBox from './AnswerBox.jsx';
import QuizComp from './quizComp.jsx';
export default function Quiz(){
    const [user, setUser] = useState([]);
    //정답을 골랐으면 그 화면에 머물르게 하기 위함.
    const idx = user.length
    
    //마지막 질문인지 확인하는 변수
    const End = idx === QUSTION.length

    const handleSelectAnswer = useCallback(function handleSelectBtn(answer){
        setUser(prevUser => [...prevUser, answer])
    },[])

    const handleSkip = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]) 

    if(End){
        return(
            <div id="summary">
                <img src={EndImg} alt="Complete"/>
                <h2>Quiz Complete!</h2>
            </div>
        )
    }
    
    return(
        <div id="quiz">
            <QuizComp 
            key={idx} 
            idx={idx}
            handleSkip={handleSkip}
            handleSelect={handleSelectAnswer}
            />
        </div>
    )
}