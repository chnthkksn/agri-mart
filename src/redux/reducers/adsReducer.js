import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "adResults",
    initialState: {},
    reducers: {
        addAds : (state, action) => {
            state[action.payload.id] = action.payload.data
        },
        clearAds : (state, action) => {
            return {}
        }
    }
});

export const { addAds, clearAds } = themeSlice.actions;

export default themeSlice.reducer;
