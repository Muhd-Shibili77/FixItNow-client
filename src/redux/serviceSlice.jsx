import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWorkerDetails = createAsyncThunk(
  "admin/fetchWorker",
  async ({ searchTerm = "", page = 1,serviceId }, thunkAPI) => {
    try {
       
        
      const response = await axios.get(
        `http://localhost:3000/worker/getworker?id=${serviceId}&search=${searchTerm}&page=${page}&limit=12`,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        });
      
      return {
        data: response.data.response,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    data: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchWorkerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
