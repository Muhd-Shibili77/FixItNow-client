import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  

const workSlice = createSlice({
  name: "worker",
  initialState: { data: null, job: [], loading: false, error: null },
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
      });
      
  },
});

export default workSlice.reducer;
