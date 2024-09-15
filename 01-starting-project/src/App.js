import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect, useState } from 'react';
import { uiActions } from './store/ui';
import Notification from './components/UI/Notification'

let initalVal = true;

function App() {
  const isShow = useSelector((state) => state.ui.isShow)
  const item = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  
  useEffect(()=>{
    const sendCartData = async() =>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Sending...',
        message:"Sending cart data"
      }
    ));
      const response = await fetch(
        'https://react-test1-8443f-default-rtdb.firebaseio.com/item.json',
        {
        method:'PUT',
        body: JSON.stringify(item),
        }
    );
    if(!response.ok){
      throw new Error("sending cart data Failed");
    }

    dispatch(uiActions.showNotification({
      status:'success',
      title:'Success...',
      message:"Sending cart data successfully"
    }))
  }

  if(initalVal){
    initalVal= false;
    return;
  }

  sendCartData().catch((e) => {
    dispatch(uiActions.showNotification({
      status:'error',
      title:'Error...',
      message:"Sending cart data Error"
    }))
  });

  },[item,dispatch]);
  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
        <Layout>
        {isShow &&<Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
