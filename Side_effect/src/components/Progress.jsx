import { useEffect, useState } from "react"

const Time = 3000

export default function Progress(){
    const [now, setNow] = useState(Time);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setNow(prevNow => prevNow - 50);
        },50)
        return ()=>{
            clearInterval(interval);
        }
    },[])
    
    return(
        <progress value={now} max={Time} />
    )
}