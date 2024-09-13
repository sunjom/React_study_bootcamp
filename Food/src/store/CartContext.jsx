import { createContext,useReducer } from "react";


const CartContext = createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {},
})

function Reducerfunction(state, action){
    if(action.type === 'ADD_ITEM'){
        const findIndex = state.items.findIndex((item) => 
            item.id === action.item.id);

        const mustUpdate = [...state.items];

        if(findIndex > -1){
            const UpdateData = state.items[findIndex];

            const Changed = {
                ...UpdateData,
                count: UpdateData.count + 1
            };

            mustUpdate[findIndex] = Changed;
            
        }else{
            mustUpdate.push({...action.item, count: 1});
        }

        return {...state, items: mustUpdate};
    }

    if(action.type === 'REMOVE_ITEM'){
        const findIndex = state.items.findIndex((item) => item.id === action.id);

        const existing = state.items[findIndex];

        const updatedItems = [...state.items];
        if(existing.count ===1){
            
            updatedItems.splice(findIndex, 1);
        }else{
            const updatedItem = {
                ...existing,
                count: existing.count -1,
            };

            updatedItems[findIndex] = updatedItem
        }

        return {...state, items:updatedItems};
    }
}



export function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(Reducerfunction, {items:[]});

    function addItem(item){
        dispatchCartAction({type:"ADD_ITEM", item})
    }
    function removeItem(id){
        dispatchCartAction({type:"REMOVE_ITEM",id})
    }
    
    const cartContext = {
        items:cart.items,
        addItem,
        removeItem,
    };
    console.log(cartContext);
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;