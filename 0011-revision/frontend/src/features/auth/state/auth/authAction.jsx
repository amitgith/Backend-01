import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

export const userRegister = createAsyncThunk(
  "/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/register", credentials);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.res?.data?.error || "Registered failed",
      );
    }
  },
);
