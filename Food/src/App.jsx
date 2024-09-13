import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import Headers from "./component/Header";
import FoodList from "./component/foodList";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <div>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Headers/>
          <FoodList/>
          <Cart/>
          <Checkout/>
        </CartContextProvider>
      </UserProgressContextProvider>
    </div>
  );
}

export default App;
