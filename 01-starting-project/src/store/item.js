import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name:'item',
    initialState:{
        item:[],
        totalAmount:0
    },
    reducers:{
        addItem:(state,action) => {
            const AllItems = action.payload;
            const findData = state.item.find((item) => item.id === AllItems.id);

            state.totalAmount++;
            if(!findData){
                state.item.push({
                    id:AllItems.id,
                    title:AllItems.title,
                    price:AllItems.price,
                    description:AllItems.description,
                    amount:1,
                    totalPrice: AllItems.price
                })
            }else{
                findData.amount += 1;
                findData.totalPrice += AllItems.price;
            }
            
        },
        removeItem:(state,action) => {
            const id = action.payload;
            const findData = state.item.find((item) => item.id === id);

            state.totalAmount--;
            if(findData.amount <=1){
                state.item = state.item.filter((item) => item.id !== id)
            }else{
                findData.amount--;
            }
        },
    }
})


export const itemAction = itemSlice.actions;
export default itemSlice;