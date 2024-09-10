import { featuredCar } from "../types/featuredCars";
import { baseApi } from "./baseApi";


export const featuredCarsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedCars: builder.query<featuredCar[], void>({  
      query: () => ({
        url: '/featured_cars',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetFeaturedCarsQuery } = featuredCarsApi;
