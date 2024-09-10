import { featuredCar } from "./featuredCars";

export type FeaturedCarsState= {
    cars: featuredCar[];
    loading: boolean;
    error: string | null;
  }