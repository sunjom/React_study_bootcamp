import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


export async function action({request}){
  //searchParams.get을 통해 쿼리문에 있는 값 가져옴.
  const SearchParams = new URL(request.url).searchParams;
  
  const mode = SearchParams.get('mode') || 'login';
  
  if(mode !=='signup' && mode !== 'login'){
    throw json({message:'지원되지 않는 기능'},{state:422})
  }
  const datas = await request.formData();

  const data = {
    email:datas.get('email'),
    password:datas.get('password')
  };

  const response = await fetch('http://localhost:8080/'+mode, {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })

  if(response.status===422 || response.status===401){
    return response;
  }

  if(!response.ok){
    throw json({message:'에러 발생!!!!!'} , {status:500})
  }

  //response.json() => json데이터를 자바스크립트로 변경
  const resData = await response.json()
  const token = resData.token;
  
  localStorage.setItem('token',token);

  const timeData = new Date();
  timeData.setHours(timeData.getHours() + 1);
  localStorage.setItem('time',timeData.toISOString());
  return redirect('/');
}