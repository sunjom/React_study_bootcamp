import { useEffect, useState } from "react"
import FoodIntro from "./FoodIntro";

export default function FoodList(){
    const [data,setData] = useState([]);
    const [userList, setUserList] = useState([]);

    async function fetchMeals(){
        const response = await fetch("http://localhost:3000/meals");

        if(!response.ok){
            // ...
        }

        const meals = await response.json();
        setData(meals);
    }

    useEffect(()=>{
        async function fetchMeals(){
            const response = await fetch("http://localhost:3000/meals");
    
            if(!response.ok){
                // ...
            }
    
            const meals = await response.json();
            setData(meals);
        }

        fetchMeals();
    },[])

    return(
        <div className="w-[80%] p-[1rem] my-[2rem] mx-auto 
        max-w-[70rem]">
            <FoodIntro data={data}/>
        </div>
    )
}