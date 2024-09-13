import { useCallback } from "react";
import { useEffect, useState } from "react";

async function sendHttpRequest(url,config){
    const response = await fetch(url,config);

    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.message || 'Something went wrong, failed to send request');
    }

    return resData;
}

export default function useHttp(url,config,initialData){
    const [data,setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState();

    const sendRequest = useCallback(
        async function sendRequest(data){
        setIsLoading(true);
        try{
            // sendHttpRequest는 Promise를 반환하기 때문에 await를 사용하여 해당 Promise가 해결될 때까지 기다린다.
            // Promise가 해결되면 그 결과 값(resData)을 반환한다.
            const resData = await sendHttpRequest(url,{...config, body:data});
            setData(resData);
        }catch(error){
            setError(error.meesage || 'Something went wrong');
        }
        setIsLoading(false);
    },[url,config]);

    useEffect(()=>{
        //!config => GET방식으로 보내갔다는 의미.(default value가 GET이라서)
        if(config && (config.method ==='GET' || !config.method) || !config){
            sendRequest();
        }
    },[sendRequest,config]);

    return{
        data,
        isLoading,
        error,
        sendRequest
    }
}