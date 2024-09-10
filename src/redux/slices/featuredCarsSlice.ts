// redux/slices/featuredCarsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FeaturedCarsState } from '../types/featuredCarState';




  
  // Initial state with the correct types
  const initialState: FeaturedCarsState = {
    cars: [],
    loading: false,
    error: null,
  };
// Async thunk to fetch featured cars from the API
export const fetchFeaturedCars = createAsyncThunk(
  'featuredCars/fetchFeaturedCars',
  async () => {
    const response = await axios.get('https://car-rental-sooty-theta.vercel.app/api/featured_cars');
    
    return response.data.data;
    
  }
);

const featuredCarsSlice = createSlice({
  name: 'featuredCars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeaturedCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch featured cars';
      });
  },
});

export default featuredCarsSlice.reducer;
