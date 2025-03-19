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
            state.loginUser = action.payload;
        },
        logoutUser:(state)=>{
            state.loginUser = null
            localStorage.removeItem('token');
        },
        loginWoker:(state,action)=>{
         
                state.loginWoker = action.payload;
            
        },
        logoutWoker:(state)=>{
            state.loginWoker = null
            localStorage.removeItem('token');
        },
        loginAdmin:(state,action)=>{
         
                state.loginAdmin = action.payload;
            
        },
        logoutAdmin:(state)=>{
            state.loginAdmin = null
            localStorage.removeItem('token');
        },

     }

})

export const {setUser,unSetUser,loginUser,loginWoker,logoutUser,logoutWoker,loginAdmin,logoutAdmin}=authSlice.actions;
export default authSlice.reducer;