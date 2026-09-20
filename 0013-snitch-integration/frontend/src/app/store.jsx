import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
