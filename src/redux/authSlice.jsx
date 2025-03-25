import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";

export const logout = createAsyncThunk(
    'auth/logout',
    async()=>{
        try {
            const response = await axiosInstance.post('/auth/logout')
            return
        } catch (error) {
            console.error('logout error:',error)
        }
    }
)
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

     },
     extraReducers:(builder)=>{
        builder
        .addCase(logout.fulfilled,(state)=>{
            state.loginUser = null
            state.loginWoker = null
            localStorage.removeItem('token');
        })
     }

})

export const {setUser,unSetUser,loginUser,loginWoker,logoutUser,logoutWoker,loginAdmin,logoutAdmin}=authSlice.actions;
export default authSlice.reducer;