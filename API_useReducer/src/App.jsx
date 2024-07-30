import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import CartProvider from './data/shopping-cart-context.jsx';

function App() {
  return (
    //Provider를 사용할 때 value값을 줘야됨.
    <CartProvider>
      <Header/>
      <Shop/>
    </CartProvider>
  );
}

export default App;
