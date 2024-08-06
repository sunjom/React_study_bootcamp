import { useEffect, useState } from "react"

export default function Timer({Timeout, onTimeout}){
    const [time, setTime] = useState(Timeout);
    useEffect(()=>{
        console.log("Time out");
        const endTime = setTimeout(onTimeout,Timeout);

        return ()=>{
            clearTimeout(endTime);
        }
    },[Timeout,onTimeout]);
    useEffect(() => {
        console.log("Interval");
        const interval = setInterval(() =>{
            setTime((prevTime) => prevTime -100);
        } ,100)
        return () =>{
            clearInterval(interval);
        } 
    },[])
    
    return(
        <progress id="question-time" value={time} max={Timeout}/>
    )
}