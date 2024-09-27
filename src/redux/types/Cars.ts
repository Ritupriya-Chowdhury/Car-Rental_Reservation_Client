export type Car= {
    _id: string;
    name: string;
    image: string;
    description: string;
    pricePerHour: number;
    carType: string;
    status: string;
  }
export type createCar= {
    
    name: string;
    image: string;
    description: string;
    pricePerHour: number;
    carType: string;
    status: string;
  }

  export type CarState= {
    cars: Car[];
    loading: boolean;
    error: string | null;
  }
  