import { configureStore } from "@reduxjs/toolkit";
import  navbarReducer from './slices/navbarSlice';
import themeReducer from './slices/themeSlice'
import featuredCarsSliceReducer from "./slices/featuredCarsSlice";
import carsReducer from './slices/carSlice';
import authReducer from './slices/authSlice';
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
import createUserReducer from './slices/authSlice';



const persistConfig= {
  key: 'auth',
  storage,
};

const persistAuthReducer= persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
      navbar :  navbarReducer,
      theme: themeReducer,
      cars: carsReducer,
      featuredCars: featuredCarsSliceReducer,
      [baseApi.reducerPath]: baseApi.reducer,
      auth:persistAuthReducer,
      createUser: createUserReducer,
      
    },
    middleware: getDefaultMiddlewares=>
      getDefaultMiddlewares(
        {serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }}
      ).concat(baseApi.middleware)
    
})
   




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor =persistStore(store);