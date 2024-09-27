import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Car, CarState} from "../types/Cars";


const initialState: CarState = {
  cars: [],
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
    console.log(response.data.data)
    return response.data.data; 
  }
);

// Delete a car
export const deleteCar = createAsyncThunk<void, string>(
  "cars/deleteCar",
  async (carId) => {
    await axios.delete(
      `https://car-rental-sooty-theta.vercel.app/api/cars/${carId}`
    );
  }
);

// Update car status
export const updateCarStatus = createAsyncThunk<
  Car,
  { carId: string; status: string }
>("cars/updateCarStatus", async ({ carId, status }) => {
  const response = await axios.put(
    `https://car-rental-sooty-theta.vercel.app/api/cars/${carId}`,
    { status }
  );
  return response.data.data;
});

// Create a new car
// export const createCar = createAsyncThunk<Car, createCar>(
//   "cars/createCar",
//   async (newCar) => {
//     const response = await axios.post(
//       "https://car-rental-sooty-theta.vercel.app/api/cars",
//       newCar // Assuming your API accepts this format
//     );
//     return response.data.data;
//   }
// );

// Update an existing car
export const updateCar = createAsyncThunk<
  Car,
  { carId: string; updates: Partial<Car> }
>("cars/updateCar", async ({ carId, updates }) => {
  const response = await axios.put(
    `https://car-rental-sooty-theta.vercel.app/api/cars/${carId}`,
    updates
  );
  return response.data.data;
});

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(deleteCar.fulfilled, (state, action) => {
        const carId = action.meta.arg;
        state.cars = state.cars.filter((car) => car._id !== carId);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete car";
      })
      .addCase(updateCarStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCarStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCar = action.payload;
        const index = state.cars.findIndex((car) => car._id === updatedCar._id);
        if (index !== -1) {
          state.cars[index] = updatedCar;
        }
      })
      .addCase(updateCarStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update car status";
      })
    //   .addCase(createCar.fulfilled, (state, action) => {
    //     state.cars.push(action.payload);
    //   })
    //   .addCase(createCar.rejected, (state, action) => {
    //     state.error = action.error.message || "Failed to create car";
    //   })
      .addCase(updateCar.fulfilled, (state, action) => {
        const updatedCar = action.payload;
        const index = state.cars.findIndex((car) => car._id === updatedCar._id);
        if (index !== -1) {
          state.cars[index] = { ...state.cars[index], ...updatedCar };
        }
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update car";
      });
  },
});

export default carsSlice.reducer;
