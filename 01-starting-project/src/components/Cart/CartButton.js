import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const Amount = useSelector(state => state.item.totalAmount);
  

  const handlerToggle = () => {
    dispatch(uiActions.toggle());
  }
  return (
    <button onClick={handlerToggle} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{Amount}</span>
    </button>
  );
};

export default CartButton;
