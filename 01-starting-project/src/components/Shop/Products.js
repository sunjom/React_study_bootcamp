import ProductItem from './ProductItem';
import classes from './Products.module.css';

const items =[
  {
    id:'i1',
    title:'test1',
    price:5,
    description:'asdsadsadsa 1'
  },
  {
    id:'i2',
    title:'test2',
    price:7,
    description:'asdsadsadsa 2'
  },
]

const Products = (props) => {  
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items.map((item) => <ProductItem
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
