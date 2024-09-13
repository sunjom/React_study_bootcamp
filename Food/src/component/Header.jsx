import { useContext } from 'react'
import Logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext';
export default function Headers(){
    const CartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const totalCartItems = CartCtx.items.reduce((totalNumber,item) => {
        return totalNumber + item.count;
    },0);

    function handleShowCart(){
        userCtx.showCart();
    }
    return(
        <div className="flex justify-between items-center px-[10%] py-[3rem]">
            <div className='flex items-center'>
                <img src={Logo} 
                alt="로고 이미지" 
                className='rounded-full 
                border-yellow-300 
                border-2 
                size-16
                mr-5
                '
                />
                <h1>ReactFood</h1>
            </div>
            <Button onClick={handleShowCart} className='text-3xl text-[#ffc404]'>Cart ({totalCartItems})</Button>
        </div>
    )
}