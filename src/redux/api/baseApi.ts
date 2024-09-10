import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://car-rental-sooty-theta.vercel.app/api',
    credentials: 'include',
  }),

  endpoints: () => ({}),
});