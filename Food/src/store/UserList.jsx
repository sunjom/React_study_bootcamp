import { createContext, useReducer } from "react";

const CartContext = createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingItems = state.items.findIndex((item) => item.id === action.item.id);

        //객체들이 들어있는 Items을 넘김.
        const updatedItems = [...state.items];
        if(existingItem > -1){
            //index의 값을 불러옴
            const existingItme = state.items[existingItems]
            // 나머진 똑같이 저장하고, 불러온 값에는 quantity를 +1 해줌.
            const updateItem = {
                ...existingItems,
                quantity:existingItme.quantity +1
            }
            //내용을 업데이트함.
            updatedItems[existingItems] = updateItem
        }else{
            updatedItems.push({...action.items, quantity: 1});
        }

        return {...state, items : updatedItems}
    }

    if(action.type == 'REMOVE_ITEM'){

    }

    return state;
}

export function UserListProivder({children}){
    //첫번째 매개변수 : 계속 실행할 함수, 두번째 매개변수 : 초기값
    useReducer(cartReducer, {items:[] });

    return <UserList.Provider>{children}</UserList.Provider>
}

export default CartContext