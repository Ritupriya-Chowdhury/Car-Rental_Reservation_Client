import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { setUser } from '../slices/authSlice';

// Basic fetchBaseQuery setup
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://car-rental-sooty-theta.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      // Adding "Bearer " to the token for the Authorization header
      headers.set('Authorization', `${token}`);
    }
    return headers;
  }
});

// Wrapper to handle token refresh
const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  // Initial API call
  let result = await baseQuery(args, api, extraOptions);
  
  // If 401 Unauthorized, try to refresh the token
  if (result?.error?.status === 401) {
    try {
      // Call the refresh token endpoint
      const refreshResponse = await fetch('https://car-rental-sooty-theta.vercel.app/api/auth/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const { accessToken } = data.data; // Make sure the structure matches your API response
        const user = (api.getState() as RootState).auth.user;

        // Update the Redux store with the new token
        api.dispatch(setUser({
          user, // Pass user object
          token: accessToken // Set the new access token
        }));

        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, log the user out or handle accordingly
        console.error('Refresh token failed', await refreshResponse.json());
        // Optionally dispatch a logout action here
        // api.dispatch(logout());
      }
    } catch (error) {
      console.error('Error while refreshing token', error);
      // Optionally dispatch a logout action here
      // api.dispatch(logout());
    }
  }

  return result;
};

// Create the base API slice
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),  // Define your API endpoints here
});
