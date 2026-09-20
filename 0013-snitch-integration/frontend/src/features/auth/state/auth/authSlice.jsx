import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../auth/authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
