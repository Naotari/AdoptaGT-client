import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    NewPostWindowState: false
}

export const newPostSlice = createSlice ({
    name: "newPost",
    initialState,
    reducers: {
        NewPostWindowSwitch: (state, action) => {
            state.NewPostWindowState = action.payload
        },
    }
})

export const {NewPostWindowSwitch} = newPostSlice.actions;
export default newPostSlice.reducer;