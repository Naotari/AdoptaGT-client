import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    NewAdoptionWindowState: false
}

export const newAdoptionSlice = createSlice ({
    name: "newAdoption",
    initialState,
    reducers: {
        NewAdoptionWindowSwitch: (state, action) => {
            state.NewAdoptionWindowState = action.payload
        },
    }
})

export const {NewAdoptionWindowSwitch} = newAdoptionSlice.actions;
export default newAdoptionSlice.reducer;