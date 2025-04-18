import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from './slices/cart-slice'

export const store = configureStore({
    reducer:{
        cart:CartSlice.reducer,
    }
})