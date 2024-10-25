import {redirect} from 'react-router-dom'
export function getToken(){
    const data = localStorage.getItem('token')
    if(!data){
        return null;
    }
    const Duration = CheckTime();
    if(Duration < 0){
        return 'EXPIRED'
    }
    return data;
}

export function CheckTime(){
    const SettingTime = localStorage.getItem('time');
    const expireTime = new Date(SettingTime);
    const nowTime = new Date();
    const Checking = expireTime.getTime() - nowTime.getTime();
    return Checking
}

export function TokenLoader(){
    return getToken();
}

export function CheckAuth(){
    if(!getToken()){
        return redirect('/auth');
    }

    return null;
}