import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from './slices/navbarSlice';
import themeReducer from './slices/themeSlice';
import featuredCarsSliceReducer from "./slices/featuredCarsSlice";
import carsReducer from './slices/carSlice';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import userManagementSliceReducer from './slices/userManagementSlice';
import { baseApi } from "./api/baseApi";
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist configuration for auth reducer
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'], // Persist only the auth reducer
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    theme: themeReducer,
    cars: carsReducer,
    featuredCars: featuredCarsSliceReducer,
    userManagement: userManagementSliceReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistAuthReducer,  // Persisted auth reducer
    booking: bookingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
