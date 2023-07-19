import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: "light",
    reducers: {
        toggleTheme: (state) => {
            if (state === "light") {
                return "dark";
            } else {
                return "light";
            }
        }
    }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;