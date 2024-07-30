import { All_items } from "../data/shopping-cart-context";
import { useContext } from "react";
export default function Product({
  id,
  image,
  title,
  price,
  description,
}) 
{
  const {addToCart} = useContext(All_items);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
