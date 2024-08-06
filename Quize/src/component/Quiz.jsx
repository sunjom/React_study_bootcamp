import { useCallback, useState } from 'react'
import QUSTION from '../qustion.js'
import EndImg from '../assets/quiz-complete.png'
import Timer from './Timer.jsx';
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

    const shuffleArr = [...QUSTION[idx].answer];
    shuffleArr.sort(() => Math.random() -0.5);
    return(
        <div id="quiz">
            <div id='question'>
                <Timer key={idx} Timeout={10000} onTimeout={handleSkip}/>
                <h2>{QUSTION[idx].text}</h2>
                <ul id="answers">
                    {shuffleArr.map((awr) => {
                        //첫 랜더링엔 awr => undefined, user = []이다.
                        //하지만, 버튼을 누르면 awr = 값, user = [값]으로 적용된 후 랜더링 된다.
                        const isSelected = user[user.length -1] == awr
                        let CSS = ''
                        if(isCorrect === 'answered' && isSelected){
                            CSS = 'selected'
                        }

                        if((isCorrect === 'correct' || isCorrect === 'wrong') && isSelected){
                            CSS = isCorrect
                            console.log("CSS");
                        }
                        return(
                            <li key={awr} className='answer'>
                                <button className={CSS} onClick={() => handleSelectAnswer(awr)}>{awr}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}