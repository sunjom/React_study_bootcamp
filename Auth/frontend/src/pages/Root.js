import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import {CheckTime} from '../util/auth.js'
function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(()=>{
    if(!token){
      return;
    }

    if(token === 'EXPIRED'){
      submit(null,{action:'/logout',method:'post'})
    }
    
    const Duration = CheckTime();
    console.log(Duration);
    setTimeout(()=>{
      console.log("END")
      submit(null,{action:'/logout',method:'post'})
    },Duration)
  },[token,submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
