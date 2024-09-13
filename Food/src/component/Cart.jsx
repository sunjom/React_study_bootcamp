import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from '../store/UserProgressContext'
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartItme from "./CartItem";

export default function Cart(){

    const CartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = CartCtx.items.reduce((totalPrice, item) => totalPrice + item.price * item.count ,0)

    function handleCloseCart(){
        userCtx.hideCart();
    }

    function handleGoToCheckout(){
        userCtx.showCheckout();
    }

    //...item으로 값을 보낼 수 있다.(안쓰이는 값도 같이 보냄.)
    return <Modal className="cart" open={userCtx.progress ==='cart' } onClose={userCtx.progress ==='cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {CartCtx.items.map(item => (
                <CartItme 
                    key={item.id}
                    name={item.name}
                    count={item.count}
                    price={item.price}
                    onIncrease={() => CartCtx.addItem(item)}
                    onDecrease={() => CartCtx.removeItem(item.id)}
                />
            ))
            }
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={handleCloseCart} textOnly>Close</Button>
            {CartCtx.items.length > 0 ? <Button onClick={handleGoToCheckout}>Go to Checkout</Button> : null}
        </p>
    </Modal>
}