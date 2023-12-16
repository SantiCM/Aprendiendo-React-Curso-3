import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";


export const store = configureStore({

    auth: authSlice.reducer

})
