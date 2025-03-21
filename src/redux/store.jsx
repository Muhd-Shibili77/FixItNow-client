import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.jsx'
import workerReducer from './workerSlice.jsx'
import adminReducer from './adminSlice.jsx'
import serviceReducer from './serviceSlice.jsx'
import userReducer from './userSlice.jsx'
import messageReducer from './messageSlice.jsx'
const store = configureStore({
    reducer:{
        auth:authReducer,
        worker:workerReducer,
        admin:adminReducer,
        service:serviceReducer,
        user:userReducer,
        message:messageReducer
    }
})

export default store;
