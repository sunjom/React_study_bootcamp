import FoodIntro from "./FoodIntro";
import useHttp from "../hook/useHttp";

const requestConfig = {};


export default function FoodList(){
    //두번째 매개변수인 {}(config)은 컴포넌트 함수가 실행될때마다 새로운 값을 준다.(고정된 값을 주면 됨)
    const {data,isLoading,error} = useHttp('http://localhost:3000/meals',requestConfig,[]);
    if(isLoading){
        return <p className="center">Fecthing waiting....</p>
    }

    // if(!data){
    //     return <p>Fecting Meals...</p>
    // }

    return(
        <div className="w-[80%] p-[1rem] my-[2rem] mx-auto 
        max-w-[70rem]">
            <FoodIntro data={data}/>
        </div>
    )
}