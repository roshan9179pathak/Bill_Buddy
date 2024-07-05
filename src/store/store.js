import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import invoSlice from './invoiceSlice'
const store = configureStore({
    reducer:{
        auth: authslice,
        invoiceSlice: invoSlice
    }
})


export default store