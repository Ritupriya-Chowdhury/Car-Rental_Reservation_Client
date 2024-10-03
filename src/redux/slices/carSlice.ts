import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Car, CarState } from "../types/Cars";

const initialState: CarState = {
  cars: [],
  carDetails: null, 
  loading: false,
  error: null,
};

// Fetch all cars
export const fetchCars = createAsyncThunk<Car[]>(
  "cars/fetchCars",
  async () => {
    const response = await axios.get(
      "https://car-rental-sooty-theta.vercel.app/api/cars"
    );
    return response.data.data; 
  }
);

// Fetch car details by ID
export const fetchCarDetails = createAsyncThunk<Car, string>(
  "cars/fetchCarDetails",
  async (id: string) => {
    const response = await axios.get(
      `https://car-rental-sooty-theta.vercel.app/api/cars/${id}`
    );
    console.log(id)
    return response.data.data; 
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all cars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      // Fetch car details
      .addCase(fetchCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.carDetails = action.payload; 
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch car details";
      });
  },
});

export default carsSlice.reducer;
