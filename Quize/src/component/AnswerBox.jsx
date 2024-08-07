import { useRef } from "react";

export default function AnswerBox({isCorrect, answers, user, handleSelectAnswer}){
    //부모 컴포넌트에서 key값을 부여해 새로운 컴포넌트 생성 => useRef의 값도 새로 만들어지므로 null로 초기화.
    const shuffleArr = useRef()
    //처음에만 값을 섞이 위해 if문으로 통제함.
    console.log(shuffleArr.current);
    if(!shuffleArr.current){
        shuffleArr.current = [...answers];
        shuffleArr.current.sort(() => Math.random() -0.5);
    }
    console.log(shuffleArr.current);
    return(
        <ul id="answers">
            {shuffleArr.current.map((awr) => {
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
    )
}