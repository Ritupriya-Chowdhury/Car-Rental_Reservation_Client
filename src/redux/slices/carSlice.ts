import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Car, CarState, createCar } from "../types/Cars";
import { RootState } from "../store"; // Adjust the import path for your store

interface ErrorResponse {
  message?: string;
}

const initialState: CarState = {
  cars: [],
  carDetails: null,
  loading: false,
  error: null,
  message: null,
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
    console.log(response)
    return response.data.data;
  }
);

// Create a car listing
export const createCarListing = createAsyncThunk<
  Car,
  createCar,
  { rejectValue: string; state: RootState }
>("cars/createCar", async (carData, { rejectWithValue, getState }) => {
  const state = getState();
  const token = state.auth.token; // Adjust this according to your authentication setup

  try {
    const response = await axios.post(
      "https://car-rental-sooty-theta.vercel.app/api/cars/create-car",
      carData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data as Car;
  } catch (error) {
    let errorMessage = "Failed to create car listing";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage =
        (error.response.data as ErrorResponse)?.message || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

// Update car listing
export const updateCarListing = createAsyncThunk<
  Car,
  { id: string; carData: createCar },
  { rejectValue: string; state: RootState }
>(
  "cars/updateCar",
  async ({ id, carData }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; 
    console.log("carData=>",carData);

    try {
     
      const response = await axios.put(
        `https://car-rental-sooty-theta.vercel.app/api/cars/${id}`,
        carData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(response)
      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to update car listing";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          (error.response.data as ErrorResponse)?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete a car listing
export const deleteCarListing = createAsyncThunk<string, string>(
  "cars/deleteCar",
  async (id: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token; // Adjust according to your authentication setup

    try {
      await axios.delete(
        `https://car-rental-sooty-theta.vercel.app/api/cars/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return id;
    } catch (error) {
      let errorMessage = "Failed to delete car listing";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          (error.response.data as ErrorResponse)?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);


// Add a customer review
export const addCustomerReview = createAsyncThunk<
  Car,
  { id: string; review: string },
  { rejectValue: string; state: RootState }
>("cars/addCustomerReview", async ({ id, review }, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;
   console.log(review)

  try {
    const response = await axios.patch(
      `https://car-rental-sooty-theta.vercel.app/api/cars/customer-review/${id}`,
     {customerReviews: review} ,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response)
    return response.data.data; 
  } catch (error) {
    let errorMessage = "Failed to add customer review";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = (error.response.data as ErrorResponse)?.message || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});


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
      })
      // Create a car
      .addCase(createCarListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCarListing.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addCase(createCarListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create car";
      })
      // Update a car
      .addCase(updateCarListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCarListing.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        );
      })
      .addCase(updateCarListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update car";
      })
      // Delete a car
      .addCase(deleteCarListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCarListing.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      })
      .addCase(deleteCarListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? "Failed to delete car";
      })

      .addCase(addCustomerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomerReview.fulfilled, (state, action) => {
        state.loading = false;
        if (state.carDetails && state.carDetails._id === action.payload._id) {
          state.carDetails.customerReviews = action.payload.customerReviews;
        }
        // Also update the specific car in the cars array
        state.cars = state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        );
      })
      .addCase(addCustomerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add customer review";
      });
  },
});

export default carsSlice.reducer;
