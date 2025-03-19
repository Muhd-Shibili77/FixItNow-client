import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import axiosInstance from "../services/AxiosInstance";

export const fetchChatMessages = createAsyncThunk(
  "msg/fetchChatMessages",
  async ({ senderId, receiverId }) => {

    const response = await axiosInstance.get(`/msg/${senderId}/${receiverId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
   
   
    return {
      chats: response.data.messages,
    };
  }
);

export const fetchChatList = createAsyncThunk(
  'msg/fetchChatList',
  async({userId})=>{
    
    const response = await axiosInstance.get(`/msg/chatlist?userId=${userId}`)
   
    return{
      chatlist : response.data.chatlist
    }
  }
)

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    chatlist: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.chats;
        
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChatList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.loading = false;
        state.chatlist = action.payload.chatlist;
        
      })
      .addCase(fetchChatList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
