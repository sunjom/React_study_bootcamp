import { createContext, useReducer, useState } from "react"
import { DUMMY_PRODUCTS } from "../dummy-products";
export let All_items = createContext({
    items:[],
    addToCart:() => {},
    updateToCart:() => {}
    }
);

//재실행되지 않아도 되는 함수이기 때문에 밖에 작성
const shoppingReducer = (state,action) =>{
    //dispatch로 전달한 내용은 action에 저장되고, state은 최종값을 저장함.
    if(action.type==="Add_Cart"){
      const updatedItems = [...state.items]; // items값들을 배열로 구현.
  
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload //cartItem => items들.
      );
  
      const existingCartItem = updatedItems[existingCartItemIndex];
      
      //-1이 아니라면 => items안에 값이 있다면.
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem, // id, name , price 값을 가져옴.
          quantity: existingCartItem.quantity + 1, // 이미 값이 있기 때문에 +1해줌 => 개수의미.
        };
        updatedItems[existingCartItemIndex] = updatedItem; // 내용을 update
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload); // DOMMY_PRODUCTS에서 값을 찾아옴.
        updatedItems.push({
          id: action.payload, 
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state, // 이전값들을 불러오고, 변화가 있는 값만 바꿔줌. 
        items: updatedItems,
      };
    }
    if(action.type==="Update_Cart"){
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1); // updatedItemIndex만 
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    return state;
}

//한곳에 많은 함수를 쓰면 복잡해지므로, 함축적으로 만들어 사용할 수 있도록 함.
export default function CartProvider({children}){
    const [shoppingState, dispatch] = useReducer(
        shoppingReducer,
        {items:[]}
    ); // 사용할 함수 : shoppingReducer, 초기값: items[]
      function handleAddItemToCart(id) {
        dispatch({
            type:"Add_Cart",
            payload:id
        }) // shoppingReducer에게 type, payload값을 전달하는 역할
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
          type:"Update_Cart",
          payload:{
            productId,
            amount
          }
        })
      }
      const Ctx = {
        items:shoppingState.items,
        addToCart:handleAddItemToCart,
        updateToCart:handleUpdateCartItemQuantity,
      }
      return(
        <All_items.Provider value={Ctx}>
            {children}
        </All_items.Provider>
      )
}