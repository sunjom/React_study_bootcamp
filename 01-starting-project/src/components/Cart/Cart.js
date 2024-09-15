import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const Items = useSelector((state) => state.item.item);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {Items.map((item) => 
        <CartItem
        item={{ title: item.title, 
          amount: item.amount, 
          total: item.totalPrice, 
          price: item.price,
          id : item.id,
        }}
      />
      )}
      </ul>
    </Card>
  );
};

export default Cart;
