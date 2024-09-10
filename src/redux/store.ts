import { configureStore } from "@reduxjs/toolkit";
import  navbarReducer from './slices/navbarSlice';
import themeReducer from './slices/themeSlice'
import featuredCarsSliceReducer from "./slices/featuredCarsSlice";



export const store = configureStore({
    reducer: {
      navbar :  navbarReducer,
      theme: themeReducer,
      featuredCars: featuredCarsSliceReducer,
      
    }
    
})
   




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch