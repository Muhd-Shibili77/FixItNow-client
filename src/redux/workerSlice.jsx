import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWorkerDetails = createAsyncThunk(
    'worker/fetchWorkerDetails',
    async(workerId,{rejectWithValue})=>{
       
        try {
            
            const response = await axios.get(`http://localhost:3000/worker/data?id=${workerId}`)
            
            return response.data.response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
        
    }
)

const workSlice =createSlice({
    name:"worker",
    initialState:{data:null,loading:false,error:null},
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchWorkerDetails.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchWorkerDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload;
        })
        .addCase(fetchWorkerDetails.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message;
        })
    }
})


export default workSlice.reducer;