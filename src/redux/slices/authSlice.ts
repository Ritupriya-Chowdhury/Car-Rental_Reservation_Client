import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

// User type definition
export type TUser = {
  _id?: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

// User profile type definition
export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "activate" | "block";
};

// Auth state type definition
type TAuthState = {
  user: TUser | null;
  loading: boolean;
  token: string | null;
  userProfile: UserProfile | null;
  error: string | null; // General error field
  passwordChangeSuccess: boolean | null; // Track password change success
  profileUpdateSuccess: boolean | null; // Track profile update success
  updateProfileError: string | null; // Specific error field for profile update
};

// Initial state
const initialState: TAuthState = {
  user: null,
  loading: false,
  token: null,
  userProfile: null,
  error: null,
  passwordChangeSuccess: null,
  profileUpdateSuccess: null,
  updateProfileError: null, // Initialize profile update error as null
};

// Create an async thunk for fetching the user profile
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token: string) => {
    const response = await fetch(
      "https://car-rental-sooty-theta.vercel.app/api/auth/user",
      {
        method: "GET",
        headers: {
          Authorization: `${token}`, // Send the token with prefix
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data.data; // Return the fetched user profile data
  }
);

// Create an async thunk for changing the password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const response = await fetch(
      "https://car-rental-sooty-theta.vercel.app/api/auth/password/change",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Send the token in headers
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change password");
    }

    const data = await response.json();
    return data.message; // You can return any relevant message or data here
  }
);

// Create an async thunk for updating the user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    {
      name,
      phone,
      address,
    }: { name: string; phone: string; address: string },
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const response = await fetch(
      "https://car-rental-sooty-theta.vercel.app/api/auth/update-profile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Send the token in headers
        },
        body: JSON.stringify({
          name,
          phone,
          address,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data.data; // Return the updated user profile data
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userProfile = null;
      state.error = null;
      state.passwordChangeSuccess = null;
      state.profileUpdateSuccess = null;
      state.updateProfileError = null; // Reset profile update error on logout
      localStorage.removeItem("token");
    },
    resetPasswordChangeState: (state) => {
      state.passwordChangeSuccess = null;
      state.error = null;
    },
    resetProfileUpdateState: (state) => {
      state.profileUpdateSuccess = null;
      state.updateProfileError = null; // Reset profile update error
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user profile";
      })

      // Handle changePassword
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordChangeSuccess = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordChangeSuccess = false;
        state.error = action.error.message || "Failed to change password";
      })

      // Handle updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.updateProfileError = null;
        state.profileUpdateSuccess = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.profileUpdateSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.profileUpdateSuccess = false;
        state.updateProfileError = action.error.message || "Failed to update profile";
      });
  },
});

// Export actions and reducer
export const {
  setUser,
  logout,
  resetPasswordChangeState,
  resetProfileUpdateState,
} = authSlice.actions;
export default authSlice.reducer;




// Selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const useUserProfile = (state: RootState) => state.auth.userProfile;
export const useAuthError = (state: RootState) => state.auth.error;
export const usePasswordChangeSuccess = (state: RootState) =>
  state.auth.passwordChangeSuccess;
export const useProfileUpdateSuccess = (state: RootState) =>
  state.auth.profileUpdateSuccess;
export const useProfileUpdateError = (state: RootState) =>
  state.auth.updateProfileError; // New selector for update profile error
export const useAuthLoading = (state: RootState) => state.auth.loading;