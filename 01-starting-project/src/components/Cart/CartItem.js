import {useDispatch, useSelector} from 'react-redux'
import classes from './CartItem.module.css';
import {itemAction} from '../../store/item'
const CartItem = (props) => {
  const { title, amount, total, price,id } = props.item;

  const Amount = useSelector(state => state.item.totalAmount);
  const dispatch = useDispatch()

  const removeItem = () => {
    dispatch(itemAction.removeItem(id));
  };

  const addItem = () => {
    dispatch(itemAction.addItem({
      title,
      amount,
      price,
      id
    }))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{Amount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItem}>-</button>
          <button onClick={addItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
