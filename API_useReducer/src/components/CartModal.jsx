import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

//forwardRef를 사용해 
const CartModal = forwardRef(function Modal(
  {title, actions },
  ref
) {
  const dialog = useRef();

  //ref => 부모 ref로 두번째 매개변수 값을 부모 파일에서 사용 가능하도록 함.
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal(); // showModal()은 dialog의 함수로 페이지의 나머지 요소와 상호작용하지 못하게 막음.
      },
    };
  });

  //원래는 새로운 dialog를 만들고 그 안에 자식들을 랜더링함.
  //하지만 createPortal함수를 씀으로써 새로운 dialog를 만들지 않고 modal Id를 가진 돔안에 랜더링함.
  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart/>
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
