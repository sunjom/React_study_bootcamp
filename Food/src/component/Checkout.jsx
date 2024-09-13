import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from '../store/UserProgressContext'
import useHttp from "../hook/useHttp";

const requestConfig = {
    method:"POST",
    headers:{
        'Content-Type' : 'application/json'
    }
}
export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.price * item.count ,0)

    function handleClose(){
        userCtx.hideCheckout();
    }

    const {
        data,
        isLoading:isSending,
        error,
        sendRequest} =useHttp('http://localhost:3000/orders',requestConfig);

    function handleSubmit(e){
        e.preventDefault();

        const fs = new FormData(e.target);
        
        const customerdata = Object.fromEntries(fs.entries());
        sendRequest(
            JSON.stringify({
                order:{
                    items:cartCtx.items,
                    customer:customerdata
                },
            })
        );
    }

    let actions = (<>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    </>)

    if(isSending){
        actions = <span>Sending order data...</span>
    }

    return(
        <Modal open={userCtx.progress === 'checkout'} onClose={userCtx.progress ==='checkout' ? handleClose: null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"/>
                <Input label="Email Address" id="email" type="email"/>
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}