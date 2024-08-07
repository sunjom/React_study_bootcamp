import EndImg from '../assets/quiz-complete.png'
import QUSTION from '../qustion.js'
export default function Summary({user}){
    const skippedAnswer = user.filter(answer => answer===null);
    const correctAnswer = user.filter((answer,index) => answer === QUSTION[index].answer[0])
    console.log(skippedAnswer);
    console.log(correctAnswer);
    const skippedAnswerShare = Math.round(skippedAnswer.length / user.length*100);
    const correctAnswerShare = Math.round(correctAnswer.length / user.length*100);
    console.log(skippedAnswer.length / user.length);
    const wrongAnswerShare = 100 - skippedAnswerShare - correctAnswerShare;
    return(
        <div id="summary">
            <img src={EndImg} alt="Complete"/>
            <h2>Quiz Complete!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{skippedAnswerShare}%</span>
                    <span className='text'>skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswerShare}%</span>
                    <span className='text'>정답 확률</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswerShare}%</span>
                    <span className='text'>틀린 확률</span>
                </p>
            </div>
            <ol>
                {user.map((answer,index)=>{
                    let cssClass = 'user-answer';

                    if(answer === null){
                        cssClass += ' skipped';
                    }else if(answer === QUSTION[index].answer[0]){
                        cssClass += ' correct';
                    }else{
                        cssClass == ' wrong';
                    }
                    // a ?? b => a가 null이라면 b
                    return(
                        <li key={index}>
                            <h3>{index +1}</h3>
                            <p className='question'>{QUSTION[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped' }</p>
                        </li>
                    )
                })}
                <li>
                    <h3>2</h3>
                    <p className='question'>question text</p>
                    <p className='user-answer'>user's answer</p>
                </li>
            </ol>
        </div>
    )
}