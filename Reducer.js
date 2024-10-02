import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    cartItems : []
}

let slice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        addToCart: (state,action)=>{
            state.cartItems.push(action.payload)
        },
        removeFromCart:(state,action)=>{
            state.cartItems.splice(action.payload , 1)
        }
    }
})


export const {addToCart, removeFromCart} = slice.actions;
export default slice.reducer;