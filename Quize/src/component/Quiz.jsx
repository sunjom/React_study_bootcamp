import { useCallback, useState } from 'react'
import QUSTION from '../qustion.js'
import EndImg from '../assets/quiz-complete.png'
import Timer from './Timer.jsx';
import AnswerBox from './AnswerBox.jsx';
import QuizComp from './quizComp.jsx';
export default function Quiz(){
    const [isCorrect , setIsCorrect] = useState('');
    const [user, setUser] = useState([]);
    //정답을 골랐으면 그 화면에 머물르게 하기 위함.
    const idx = isCorrect ==='' ? user.length : user.length-1;
    
    //마지막 질문인지 확인하는 변수
    const End = idx === QUSTION.length

    const handleSelectAnswer = useCallback(function handleSelectBtn(answer){
        setUser(prevUser => [...prevUser, answer])
        //값을 선택했을 경우 값 변경 => 답을 눌렀을 경우 CSS 적용시키기 위함.
        setIsCorrect('answered');
        //정답인지 아닌지에 따른 CSS 적용을 위해 Timeout 지정
        setTimeout(() => {
            if(answer === QUSTION[idx].answer[0]){
                setIsCorrect('correct');
            }else{
                setIsCorrect('wrong');
            }
            //2초 뒤에 값 초기화
            setTimeout(()=>{
                setIsCorrect("");
            },2000)
        },1000)

    },[idx])

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
            handleSkip={handleSkip}
            question= {QUSTION[idx]}
            isCorrect={isCorrect}
            user={user}
            handleSelectAnswer={handleSelectAnswer} 
            />
        </div>
    )
}