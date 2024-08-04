import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = function ({open, close, children }) {
  const dialog = useRef();
  //App.jsx가 무조건 실행되야 함으로 의존도 있는 useEffect라고 볼 수 있음.
  //그래서 두번째 매개변수에 값을 부여해야함.
  //open함수가 변함에 따라 조건문을 받아들어야 하는데 만약 빈 배열로 받는다면 이미 페이지가 생성됬을 때 한번 수행되므로 작동을 안한다.
  useEffect(()=>{
    if(open){
      dialog.current.showModal();
    }else{ 
      dialog.current.close();
    }
  },[open])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={close}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
