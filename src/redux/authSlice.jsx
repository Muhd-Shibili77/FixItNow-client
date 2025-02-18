import { createSlice } from "@reduxjs/toolkit";

const authSlice =createSlice({
    name:"auth",
    initialState:{user:null,loginUser:null,loginWoker:null},
    reducers: {
        setUser: (state, action) => {
          if (action.payload.user) {
            state.user = { ...state.user, ...action.payload.user }; 
          }
        },
        unSetUser:(state,action)=>{
            state.user = null
        },
        loginUser:(state,action)=>{
            if (action.payload.loginUser) {
                state.loginUser = { ...state.loginUser, ...action.payload.loginUser }; 
            }
        },
        logoutUser:(state,action)=>{
            state.loginUser = null
        },
        loginWoker:(state,action)=>{
            if (action.payload.loginWoker) {
                state.loginWoker = { ...state.loginWoker, ...action.payload.loginWoker }; 
            }
        },
        logoutWoker:(state,action)=>{
            state.loginWoker = null
        },

     }

})

export const {setUser,unSetUser,loginUser,loginWoker}=authSlice.actions;
export default authSlice.reducer;