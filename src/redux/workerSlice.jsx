import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";


export const fetchFullService = createAsyncThunk(
  'admin/fetchFullService',
  async () => {
    
    try {
      const response = await axiosInstance.get(`/service/fetchFullService`);
      return {
        services: response.data.response,
      }
    } catch (error) {
      console.log(error.response.data)
      return 
    }
  }
);


export const fetchWorkerDetails = createAsyncThunk(
  "worker/fetchWorkerDetails",
  async (workerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/worker/data?id=${workerId}`,{
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
      const response = await axiosInstance.get(
        `/worker/getJob?id=${workerId}`,{
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
        await axiosInstance.put(
          `/worker/updateJob?id=${jobId}`,
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
   
    await axiosInstance.patch(`/worker/updateWork?bookingId=${bookingId}&workStatus=${workStatus}`)
    return {bookingId,workStatus:workStatus}
  }
)  
export const toggleReachStatus = createAsyncThunk(
  'worker/toggleReachStatus',
  async ({bookingId,reachStatus})=>{
    
    await axiosInstance.patch(`/worker/updateReach?bookingId=${bookingId}&reachStatus=${reachStatus}`)
    return {bookingId,reachingStatus:reachStatus}
  }
)  
export const updateAmount = createAsyncThunk(
  'worker/updateAmount',
  async ({bookingId,amount})=>{
    
    await axiosInstance.patch(`/worker/updateAmount?bookingId=${bookingId}&amount=${amount}`)
    return {bookingId,amount:amount}
  }
)  
export const getWallet = createAsyncThunk(
  'worker/getWallet',
  async ({userId})=>{
 
    const response = await axiosInstance.get(`/worker/wallet?workerId=${userId}`)
    return {wallet: response.data.response}
  }
)  
export const getReviews = createAsyncThunk(
  'worker/getReviews',
  async ({workerId})=>{

    const response = await axiosInstance.get(`/user/review?workerId=${workerId}`,{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    return {reviews: response.data.response}
  }
)  
  

const workSlice = createSlice({
  name: "worker",
  initialState: { services:[],data: null,wallet:null, job: [],reviews:[], loading: false, error: null },
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
      .addCase(fetchFullService.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFullService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
      })
      .addCase(fetchFullService.rejected, (state, action) => {
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
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getReviews.rejected, (state, action) => {
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
            ? { ...job, isAccepted: action.payload.isAccepted,workStatus:'Pending' }
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
