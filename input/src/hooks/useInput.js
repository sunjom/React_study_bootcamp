import { useState } from "react";

export function useInput({initial}){
    const [data,setData] = useStat({initial});
    const [error,setError] = useState(false);

    function handleChange(event){
        setData(event.target.value);
        setError(false);
    }

    function handleBlur(){
        setError(true);
    }
}