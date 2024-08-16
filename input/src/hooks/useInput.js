import { useState } from "react";

export function useInput(initial, errorFn){
    const [data,setData] = useState(initial);
    const [error,setError] = useState(false);
    
    const errorCheck = errorFn(data);

    function handleChange(event){
        setData(event.target.value);
        setError(false);
    }

    function handleBlur(){
        setError(true);
    }
    return{
        data,
        errorCheck:error && errorCheck,
        handleChange,
        handleBlur,
    }
}