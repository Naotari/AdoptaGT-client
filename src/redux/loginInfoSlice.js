import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginData: {},
    logged: false,
};

export const loginInfoSlice = createSlice({
    name: "loginInfo",
    initialState,
    reducers: {
        obtainLoginInfo: (state, action) => {
            state.loginData = action.payload
        },
        loginState: (state, action) => {
            state.logged = action.payload
        },
        changeUserImage: (state, action) => {
            state.loginData.image = action.payload
        }
    }
})

export const {obtainLoginInfo, loginState, changeUserImage} = loginInfoSlice.actions;
export default loginInfoSlice.reducer;