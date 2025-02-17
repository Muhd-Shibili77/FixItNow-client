import { createSlice } from "@reduxjs/toolkit";

const authSlice =createSlice({
    name:"auth",
    initialState:{user:null,loginUser:null},
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
        }
     }

})

export const {setUser,unSetUser,loginUser}=authSlice.actions;
export default authSlice.reducer;