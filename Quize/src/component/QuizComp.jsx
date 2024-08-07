import Timer from "./Timer"
import AnswerBox from "./AnswerBox"
export default function QuizComp({handleSkip, question, isCorrect, user, handleSelectAnswer}){
    
    return(
        <div id='question'>
                <Timer Timeout={10000} onTimeout={handleSkip}/>
                <h2>{question.text}</h2>
                <AnswerBox
                    isCorrect={isCorrect}
                    answers={question.answer} 
                    user={user} 
                    handleSelectAnswer={handleSelectAnswer}>
                </AnswerBox>
            </div>
    )
}