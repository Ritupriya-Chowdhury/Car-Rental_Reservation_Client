export type Car= {
    _id: string;
    name: string;
    image: string;
    description: string;
    color:string;
    isElectric:boolean;
    features:string[];
    status: string;
    location:string;
    pricePerHour: number;
    startDate:string;
    endDate:string;
    carType: string;
    customerReviews:string[];
    
    
  }
export type createCar= {
  
    
  name: string;
  image: string;
  description: string;
  color:string;
  isElectric:boolean;
  features:string[];
  status: string;
  location:string;
  pricePerHour: number;
  startDate:string;
  endDate:string;
  carType: string;
 
 
  }

  export type CarState= {
    [x: string]: any;
    cars: Car[];
    carDetails: Car | null;
    loading: boolean;
    error: string | null;
    message: string | null;
  }
  