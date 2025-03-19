import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../services/AxiosInstance";

export const fetchAddress = createAsyncThunk(
    'user/fetchAddress',
    async(userId,{rejectWithValue})=>{
       
        try {
            
            const response = await axiosInstance.get(`/user/getAddress?id=${userId}`,{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            
            return response.data.response;
        } catch (error) {
            
            return rejectWithValue(error.response.data);
        }
        
    }
)

export const fetchUserBookings = createAsyncThunk(
    "user/fetchUserBookings",
    async (userId, { rejectWithValue }) => {
      
        try {
            const response = await axiosInstance.get(`/user/getBookings?id=${userId}`);  
            return response.data.response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async({userId})=>{
        const response = await axiosInstance.get(`/user/userInfo?id=${userId}`,{
           headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        });

        return {userData:response.data.response}
    }
);

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async ({userId,formData})=>{
        const response = await axiosInstance.put(`/user/update?id=${userId}`,formData,{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        return response.data.response;
    }
)


const userSlice =createSlice({
    name:"user",
    initialState:{data:[],bookings: [],userData:null,editFormData: null,loading:false,error:null},
    reducers: {
        startEditing:(state)=>{
            state.editFormData = {username:state.userData.username  || '',phone:state.userData.phone || '',profileImage:state.userData.profileImage}
        },
        cancelEditing:(state)=>{
            state.editFormData =null
        },
        updateEditField:(state,action)=>{
            const {field,value}=action.payload;
            state.editFormData[field] = value;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAddress.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchAddress.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload;
        })
        .addCase(fetchAddress.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload; 
        })
      
        .addCase(fetchUserBookings.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserBookings.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
        })
        .addCase(fetchUserBookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchUserData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload.userData;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.editFormData = action.payload
        })
    }
})


export const { startEditing, cancelEditing, updateEditField } = userSlice.actions;
export default userSlice.reducer;