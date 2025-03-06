import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk(
    'user/fetchAddress',
    async(userId,{rejectWithValue})=>{
       
        try {
            
            const response = await axios.get(`http://localhost:3000/user/getAddress?id=${userId}`,{
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
            const response = await axios.get(`http://localhost:3000/user/getBookings?id=${userId}`,{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            });
            
            return response.data.response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const userSlice =createSlice({
    name:"user",
    initialState:{data:[],bookings: [],loading:false,error:null},
    reducers: {},
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
        });
    }
})


export default userSlice.reducer;