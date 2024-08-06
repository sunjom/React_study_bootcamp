import quizImg from '../assets/quiz-logo.png'

export default function Header(){
    return(
        <header>
            <img src={quizImg} alt="quizLogo"/>
            <h1>유선종 퀴즈!</h1>
        </header>
    )
}