import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { TSignUpUser } from "../types/auth.interface";

// Define the state structure
interface CreateUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  user: any | null;
}

// Define the error response interface
interface ErrorResponse {
  message: string;
}

// Define the initial state
const initialState: CreateUserState = {
  loading: false,
  success: false,
  error: null,
  user: null,
};

// Define the create user async thunk
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData: TSignUpUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://car-rental-sooty-theta.vercel.app/api/auth/signup",
        userData
      );
      
      return response.data; 
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion for AxiosError
      const errorMessage =
        (axiosError.response?.data as ErrorResponse)?.message ||
        "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the slice
const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    resetCreateUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.user = null; // Resetting user data as well
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload; // Storing user data
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string; // Handle the error message
      });
  },
});

// Export actions and reducer
export const { resetCreateUserState } = createUserSlice.actions;
export default createUserSlice.reducer;
