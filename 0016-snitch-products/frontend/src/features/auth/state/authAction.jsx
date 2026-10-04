import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", credentials);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "registered failed",
      );
    }
  },
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "login failed",
      );
    }
  },
);

export const currentLoggedUser = createAsyncThunk(
  "/auth/me",
  async (_, thunkApi) => {
    try {
      const accessToken = thunkApi.getState().auth.accessToken;
      const res = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Current logged in  failed",
      );
    }
  },
);
