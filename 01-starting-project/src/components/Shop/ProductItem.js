import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {itemAction} from '../../store/item'

const ProductItem = (props) => {
  const { title, price, description,id } = props;

  const dispatch = useDispatch();

  const handlerAddItem = () =>{
    dispatch(itemAction.addItem({
      title,
      price,
      description,
      id
    }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handlerAddItem}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
