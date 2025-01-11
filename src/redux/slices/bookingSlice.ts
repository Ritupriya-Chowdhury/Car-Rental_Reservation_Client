import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BookingState, BookingCriteria,  CreateBookingData } from "../types/Booking";
import { RootState } from "../store";

// Initial state for booking
const initialState: BookingState = {
  criteria: {},
  cars: [],
  loading: false,
  error: null,
  bookingData: null,
  bookings: null,
};

// Fetch filtered cars based on booking criteria
export const fetchFilteredCars = createAsyncThunk(
  "booking/fetchFilteredCars",
  async (criteria: BookingCriteria, { rejectWithValue }) => {
    try {
      const features = Array.isArray(criteria.features)
        ? criteria.features
        : criteria.features
        ? [criteria.features]
        : [];

      const params: any = {
        ...(criteria.carType && { carType: criteria.carType }),
        ...(features.length > 0 && { features: features.join(",") }),
        ...(criteria.location && { location: criteria.location }),
        ...(criteria.priceRange && { priceRange: criteria.priceRange }),
        ...(criteria.startDate && { startDate: criteria.startDate }),
        ...(criteria.endDate && { endDate: criteria.endDate }),
      };

      const response = await axios.get(
        "https://car-rental-sooty-theta.vercel.app/api/cars",
        { params }
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch cars");
    }
  }
);

// Create a booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: CreateBookingData, { rejectWithValue, getState }) => {
    console.log(bookingData)
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await axios.post(
        "https://car-rental-sooty-theta.vercel.app/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `${token}`, // Token without Bearer prefix
          },
        }
      );
      
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create booking");
    }
  }
);

// Get a booking by ID
export const getBooking = createAsyncThunk(
  "booking/getBooking",
  async (bookingId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await axios.get(
        `https://car-rental-sooty-theta.vercel.app/api/bookings/booking/${bookingId}`,
        {
          headers: {
            Authorization: `${token}`, // Token without Bearer prefix
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch booking");
    }
  }
);

// Confirm a booking by booking ID
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (bookingId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await axios.put(
        `https://car-rental-sooty-theta.vercel.app/api/bookings/confirmation/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `${token}`, // Token without Bearer prefix
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to confirm booking");
    }
  }
);

// Get my bookings
export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await axios.get(
        "https://car-rental-sooty-theta.vercel.app/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `${token}`, // Token without Bearer prefix
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch my bookings");
    }
  }
);

// Get all bookings
export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token; // Get token from state
console.log(token)
      const response = await axios.get(
        "https://car-rental-sooty-theta.vercel.app/api/bookings",
        {
          headers: {
            Authorization: `${token}`, // Token without Bearer prefix
          },
        }
      );
const res=response;
console.log("Res=>",res)
      return response.data.data; // Assuming the data comes in data.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch all bookings");
    }
  }
);

// Create the booking slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateCriteria: (state, action) => {
      state.criteria = { ...state.criteria, ...action.payload };
    },
    resetCriteria: (state) => {
      state.criteria = initialState.criteria;
      state.cars = [];
    },
    resetBookingData: (state) => {
      state.bookingData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingData = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingData = action.payload;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(confirmBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingData = action.payload;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload; 
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { updateCriteria, resetCriteria, resetBookingData } =
  bookingSlice.actions;

export default bookingSlice.reducer;
