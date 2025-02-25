import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.jsx'
import workerReducer from './workerSlice.jsx'
import adminReducer from './adminSlice.jsx'
import serviceReducer from './serviceSlice.jsx'
const store = configureStore({
    reducer:{
        auth:authReducer,
        worker:workerReducer,
        admin:adminReducer,
        service:serviceReducer,
    }
})

export default store;
