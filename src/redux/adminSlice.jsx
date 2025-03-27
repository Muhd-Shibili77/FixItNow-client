import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from '../services/AxiosInstance'


export const fetchServiceDetails = createAsyncThunk(
    'admin/fetchServiceDetails',
    async ({searchTerm ='',page=1},thunkAPI) => {
      try {
       
        const response = await AxiosInstance.get(`/service/getService?search=${searchTerm}&page=${page}&limit=8`,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        });
  
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

export const deleteService = createAsyncThunk(
  'admin/deleteService',
  async({serviceId,isDelete})=>{
      await AxiosInstance.patch(`/service/delService?serviceId=${serviceId}&action=${!isDelete}`)
      return { serviceId, isDelete: !isDelete };
  }
)

  export const fetchFullUsers = createAsyncThunk(
    'admin/fetchFullUsers',
    async ({searchTerm,page})=>{
      
      const response = await AxiosInstance.get(`/admin/users?search=${searchTerm}&page=${page}&limit=10`)
      return {
        users: response.data.response,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages
      };
    }
  )

  export const toggleBlockUser = createAsyncThunk(
    'admin/toggleBlockUser',
    async ({userId,isBlocked})=>{
      await AxiosInstance.patch(`/admin/users?actions=${!isBlocked}&id=${userId}`,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
      return { userId, isBlocked: !isBlocked };
    }
  )
  

  export const fetchFullWorkers = createAsyncThunk(
    'admin/fetchFullWorkers',
    async ({searchTerm,page})=>{
      
      const url = page 
      ? `/admin/workers?search=${searchTerm}&page=${page}&limit=10`
      : `/admin/workers`; 
      
      const response = await AxiosInstance.get(url,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
      return {
        workers: response.data.response,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages
      };
    }
  )

  export const toggleBlockWorker = createAsyncThunk(
    'admin/toggleBlockWorker',
    async ({workerId,isBlocked})=>{
      await AxiosInstance.patch(`/admin/workers?actions=${!isBlocked}&id=${workerId}`,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
      return { workerId, isBlocked: !isBlocked };
    }
  )

  export const fetchFullBookings = createAsyncThunk(
    'admin/fetchFullBookings',
    async ({searchTerm,page})=>{
      const response = await AxiosInstance.get(`/admin/bookings?search=${searchTerm}&page=${page}&limit=10`,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
     
      return {
        bookings: response.data.response,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages
      };
    }
  )
  export const toggleCancelBooking = createAsyncThunk(
    'admin/toggleCancelBooking',
    async ({bookingId})=>{
      
      await AxiosInstance.patch(`/admin/bookings?id=${bookingId}`,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
      return { bookingId, workStatus: "Cancelled" };
    }
  )
  export const fetchDashBoardDetails = createAsyncThunk(
    'admin/fetchDashBoardDetails',
    async ()=>{
      
      const response = await AxiosInstance.get(`/admin/dashboard`,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
      return {
        dash:response.data.response
      }
    }
  )

  export const fetchEarnings = createAsyncThunk(
    'admin/fetchEarnings',
    async ({searchTerm,page})=>{
      
      const response = await AxiosInstance.get(`/admin/earnings?search=${searchTerm}&page=${page}&limit=10`)
      return {
        earnings: response.data.response,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages
      };
    }
  )


  

const adminSlice =createSlice({
    name:"admin",
    initialState:{data: [],users:[],earnings:[],workers:[],bookings:[],dash:[],loading:false,error:null, totalPages:1, currentPage:1},
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
        .addCase(deleteService.fulfilled,(state,action)=>{
          state.data = state.data.map((service) =>
            service.id === action.payload.serviceId ? { ...service, isDelete: action.payload.isDelete } : service
          );
        })
        .addCase(fetchFullUsers.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchFullUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.users = action.payload.users;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
          
        })
        .addCase(fetchFullUsers.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message;
        })
        .addCase(toggleBlockUser.fulfilled, (state, action) => {
          state.users = state.users.map((user) =>
            user.id === action.payload.userId ? { ...user, isBlock: action.payload.isBlocked } : user
          );
        })
        .addCase(fetchFullWorkers.pending,(state)=>{
            state.loading = true
        })

        .addCase(toggleBlockWorker.fulfilled, (state, action) => {
          state.workers = state.workers.map((worker) =>
            worker.id === action.payload.workerId ? { ...worker, isBlock: action.payload.isBlocked } : worker
          );
        })
        
        .addCase(fetchFullWorkers.fulfilled,(state,action)=>{
            state.loading = false
            state.workers = action.payload.workers;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
          
        })
        .addCase(fetchFullWorkers.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message;
        })
        .addCase(fetchFullBookings.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchFullBookings.fulfilled,(state,action)=>{
            state.loading = false
            state.bookings = action.payload.bookings;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
          
        })
        .addCase(fetchFullBookings.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message;
        })
        .addCase(fetchDashBoardDetails.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchDashBoardDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.dash = action.payload.dash;      
        })
        .addCase(fetchDashBoardDetails.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message;
        })
        .addCase(toggleCancelBooking.fulfilled,(state,action)=>{
            state.bookings = state.bookings.map((booking)=>
              booking.id === action.payload.bookingId ? {...booking,workStatus:action.payload.workStatus}:booking 
            )
        })
        .addCase(fetchEarnings.pending,(state)=>{
          state.loading = true
      })
      .addCase(fetchEarnings.fulfilled,(state,action)=>{
          state.loading = false
          state.earnings = action.payload.earnings;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        
      })
      .addCase(fetchEarnings.rejected,(state,action)=>{
          state.loading = false
          state.error = action.error.message;
      })
    }
})


export default adminSlice.reducer;