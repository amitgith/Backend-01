import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", credentials);
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
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "login failed",
      );
    }
  },
);

export const refreshAccessToken = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/refresh");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Refresh token failed",
      );
    }
  },
);

export const currentLoggedUser = createAsyncThunk(
  "/auth/me",
  async (_, thunkApi) => {
    try {
      const accessToken = thunkApi.getState().auth.accessToken;
      if (!accessToken) {
        return thunkApi.rejectWithValue("Access token not found");
      }
      const res = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Current logged in failed",
      );
    }
  },
);
