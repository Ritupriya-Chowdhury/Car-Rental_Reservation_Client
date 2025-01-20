import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


// Define the UserManagementState interface
export interface UserManagementState {
  users: any[]; // Adjust the type as necessary (e.g., use a more specific type for user data)
  loading: boolean;
  error: string | null;
}

// Define the initial state for user management
const initialState: UserManagementState = {
  users: [],
  loading: false,
  error: null,
};

// API URLs
const API_URL = "https://car-rental-sooty-theta.vercel.app/api/auth";

// Async action to fetch all users
export const fetchAllUsers = createAsyncThunk('userManagement/fetchAllUsers', async (_, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.token; // Access the token from the Redux store

  const response = await axios.get(`${API_URL}/all-users`, {
    headers: {
      Authorization: `${token}`, // Attach the token with prefix
    },
  });
  console.log(response.data.data) ;
  return response.data.data; // You may need to adjust the response structure based on your API
});

// Async action to make a user an admin
export const changeRole = createAsyncThunk('userManagement/makeAdmin', async (email: string, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.token; // Access the token from the Redux store

  const response = await axios.patch(`${API_URL}/update-role/${email}`,
  
    { 
    email,
      role: 'admin',
    
     },
    {
      headers: {
        Authorization: `${token}`, // Attach the token with prefix
      },
    }
  );
  console.log(response) ;
  return {  role: 'admin' };
});

// Async action to block/unblock a user
export const updateUserStatus = createAsyncThunk('userManagement/updateUserStatus', async (email: string, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.token; // Access the token from the Redux store

  const response = await axios.patch(`${API_URL}/update-status/${email}`, 
    { 
      status: 'blocked' }, // Adjust status if needed
    {
      headers: {
        Authorization: `${token}`, // Attach the token with prefix
      },
    }
  );
  console.log(response) ;
  return { status: 'blocked' }; // Return status as per your API response
});

// Async action to delete a user
export const deletion = createAsyncThunk('userManagement/deleteUser', async (email: string, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.token; // Access the token from the Redux store

  await axios.delete(`${API_URL}/delete-user/${email}`, {
    headers: {
      Authorization: `${token}`, // Attach the token with prefix
    },
  });
  return email;
});

// Create the user management slice
const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    // Action to set error state manually
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all users
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
    });

    // Make a user admin
    builder.addCase(changeRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeRole.fulfilled, (state, action) => {
      state.loading = false;
      const user = state.users.find((user) => user.email === action.payload);
      if (user) {
        user.role = action.payload.role;
      }
    });
    builder.addCase(changeRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to make admin';
    });

    // Update user status (block/unblock)
    builder.addCase(updateUserStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      state.loading = false;
      const user = state.users.find((user) => user.email === action.payload);
      if (user) {
        user.status = action.payload.status;
      }
    });
    builder.addCase(updateUserStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update user status';
    });

    // Delete a user
    builder.addCase(deletion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletion.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.email !== action.payload);
    });
    builder.addCase(deletion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete user';
    });
  },
});

// Export the actions for dispatching
export const { setError } = userManagementSlice.actions;

// Export the reducer as default
export default userManagementSlice.reducer;
