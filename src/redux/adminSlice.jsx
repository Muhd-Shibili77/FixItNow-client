import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServiceDetails = createAsyncThunk(
    'admin/fetchServiceDetails',
    async ({searchTerm ='',page=1},thunkAPI) => {
      try {
  
        const response = await axios.get(`http://localhost:3000/service/getService?search=${searchTerm}&page=${page}&limit=12`);
      
        return {
          data: response.data.response,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages
      };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  

const adminSlice =createSlice({
    name:"admin",
    initialState:{data: [],loading:false,error:null, totalPages: 1, currentPage: 1},
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchServiceDetails.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchServiceDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(fetchServiceDetails.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message;
        })
    }
})


export default adminSlice.reducer;