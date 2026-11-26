import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserApi,
  loginApi,
  logoutApi,
  refreshApi,
  registerApi,
} from "../api/authApi.js";

const messageFrom = (error) =>
  error.response?.data?.errors?.[0]?.message ??
  error.response?.data?.message ??
  "Something went wrong. Please try again.";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginApi(credentials);
    } catch (error) {
      return rejectWithValue(messageFrom(error));
    }
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials, { rejectWithValue }) => {
    try {
      return await registerApi(credentials);
    } catch (error) {
      return rejectWithValue(messageFrom(error));
    }
  },
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      return await refreshApi();
    } catch (error) {
      if (error.response?.status === 401) return rejectWithValue(null);
      return rejectWithValue("Unable to check your session. Check your connection and sign in.");
    }
  },
);

export const loadCurrentUser = createAsyncThunk(
  "auth/loadCurrentUser",
  async (accessToken, { rejectWithValue }) => {
    try {
      return await getCurrentUserApi(accessToken);
    } catch (error) {
      return rejectWithValue(messageFrom(error));
    }
  },
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch {
      return rejectWithValue(
        "You were signed out on this device, but the server could not invalidate your session. Try again when online.",
      );
    }
  },
);

const initialState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(restoreSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCurrentUser.pending, (state) => {
        state.error = null;
      })
      .addCase(signOut.pending, (state) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        state.status = "idle";
      })
      .addCase(signIn.fulfilled, applySession)
      .addCase(signUp.fulfilled, applySession)
      .addCase(restoreSession.fulfilled, (state, action) => {
        applySession(state, action);
        state.initialized = true;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to sign in.";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to create your account.";
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.status = "idle";
        state.initialized = true;
        state.error = action.payload ?? null;
      })
      .addCase(loadCurrentUser.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to load your profile.";
      })
      .addCase(signOut.fulfilled, clearSession)
      .addCase(signOut.rejected, (state, action) => {
        clearSession(state);
        state.error = action.payload ?? "Could not end the session on the server.";
      });
  },
});

function applySession(state, action) {
  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken;
  state.status = "succeeded";
  state.error = null;
  state.initialized = true;
}

function clearSession(state) {
  state.user = null;
  state.accessToken = null;
  state.status = "idle";
  state.initialized = true;
}

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
