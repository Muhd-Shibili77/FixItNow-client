import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../services/AxiosInstance";

export const fetchWorkerDetails = createAsyncThunk(
  "worker/fetchWorkerDetails",
  async (workerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/worker/data?id=${workerId}`,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        });

      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWorkerJob = createAsyncThunk(
  "worker/fetchWorkerJob",
  async (workerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/worker/getJob?id=${workerId}`,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        });

      return response.data.response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch worker job"
      );
    }
  }
);

export const updateJobStatus = createAsyncThunk(
    "worker/updateJobStatus",
    async ({ jobId, isAccepted }, { rejectWithValue }) => {
      try {
        await axios.put(
          `http://localhost:3000/worker/updateJob?id=${jobId}`,
          { isAccepted },{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
          }
        );
        return { jobId, isAccepted };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update job status");
      }
    }
  );

export const toggleWorkStatus = createAsyncThunk(
  'worker/toggleWorkStatus',
  async ({bookingId,workStatus})=>{
   
    await axiosInstance.patch(`/worker/updateWork?bookingId=${bookingId}&workStatus=${workStatus}`,{},{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    return {bookingId,workStatus:workStatus}
  }
)  
export const toggleReachStatus = createAsyncThunk(
  'worker/toggleReachStatus',
  async ({bookingId,reachStatus})=>{
    
    await axiosInstance.patch(`/worker/updateReach?bookingId=${bookingId}&reachStatus=${reachStatus}`,{},{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    return {bookingId,reachingStatus:reachStatus}
  }
)  
export const updateAmount = createAsyncThunk(
  'worker/updateAmount',
  async ({bookingId,amount})=>{
    
    await axiosInstance.patch(`/worker/updateAmount?bookingId=${bookingId}&amount=${amount}`,{},{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    return {bookingId,amount:amount}
  }
)  
export const getWallet = createAsyncThunk(
  'worker/getWallet',
  async ({userId})=>{
 
    const response = await axiosInstance.get(`/worker/wallet?workerId=${userId}`,{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    return {wallet: response.data.response}
  }
)  
  

const workSlice = createSlice({
  name: "worker",
  initialState: { data: null,wallet:null, job: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWorkerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload.wallet;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWorkerJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkerJob.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(fetchWorkerJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
       
        state.job = state.job.map((job) =>
          job.id === action.payload.jobId
            ? { ...job, isAccepted: action.payload.isAccepted }
            : job
        );
      })
      .addCase(toggleWorkStatus.fulfilled, (state, action) => {
        state.job = state.job.map((job) =>
          job.id === action.payload.bookingId ? { ...job, workStatus: action.payload.workStatus }: job
        );
      })
      .addCase(toggleReachStatus.fulfilled, (state, action) => {
        state.job = state.job.map((job) =>
          job.id === action.payload.bookingId ? { ...job, reachingStatus: action.payload.reachingStatus }: job
        );
      }) 
      .addCase(updateAmount.fulfilled, (state, action) => {
        state.job = state.job.map((job) =>
          job.id === action.payload.bookingId ? { ...job, amount: action.payload.amount }: job
        );
      });  
  },
});

export default workSlice.reducer;
