import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui";
import itemSlice from "./item";

const store = configureStore({
    reducer:{ui : uiSlice.reducer, item: itemSlice.reducer}
});

export default store;