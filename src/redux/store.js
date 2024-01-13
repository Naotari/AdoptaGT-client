import { configureStore } from "@reduxjs/toolkit";
import loginInfoReducer from "./loginInfoSlice";
import newAdoptionReducer from "./newAdoptionSlice"
import newPostReducer from "./newPostSlice"

export const store = configureStore({
    reducer: {
        LoginInfo: loginInfoReducer,
        NewAdoption: newAdoptionReducer,
        NewPost: newPostReducer,
    },
})