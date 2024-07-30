import { useRef, useContext } from 'react';

import CartModal from './CartModal.jsx';

import { All_items } from '../data/shopping-cart-context.jsx';

export default function Header() {
  const modal = useRef(); // CartModal => child에 있는 함수를 가져와 사용함.

  const {items} = useContext(All_items);

  const cartQuantity = items.length; // 카트에 담긴 아이템의 갯수

  function handleOpenCartClick() {
    modal.current.open(); //자식 컴포넌트의 open()함수 실행
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal} // 이렇게 함으로써 직접적으로 자식에 있는 값을 가져올수 있음.
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
