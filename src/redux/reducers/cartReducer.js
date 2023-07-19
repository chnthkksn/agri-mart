import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        addCart: (state, action) => {
            state[action.payload.id] = action.payload.data
        },
        remoceFromCart: (state, action) => {
            delete state[action.payload.id]
        },
        clearCart: (state) => {
            state = {}
        }
    }
})

export const { addCart, remoceFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer