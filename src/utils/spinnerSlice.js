import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
    name: "spinner",
    initialState: {
        showSpinner: false
    },
    reducers: {
        toggleSpinner: (state) => {
            state.showSpinner = !state.showSpinner
        },
        setSpinner: (state, action) => {
            state.showSpinner = action.payload
        }
    }
})
export const { toggleSpinner, setSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;