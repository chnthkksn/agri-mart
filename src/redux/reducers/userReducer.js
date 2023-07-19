import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userType",
    initialState: 'customer',
    reducers: {
        setType: (state, action) => {
            return action.payload
        }
    }
});

export const { setType } = userSlice.actions;

export default userSlice.reducer;