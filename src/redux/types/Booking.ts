
import { Car} from "./Cars";

export type BookingData = {

 _id?: string;
  carId?: string;
  car?: any;
  date: string;
  startTime: string;
  endTime: string;
  nidOrPassport: string;
  drivingLicense: string;
  paymentDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
  paymentStatus?:string;
  status?:string;
  additionalOptions: {
    gps?: boolean;
    childSeat?: boolean;
  };

};
export type CreateBookingData = {


  carId?: string;
  date: string;
  startTime: string;
  endTime: string;
  nidOrPassport: string;
  drivingLicense: string;
  paymentDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
 
  additionalOptions: {
    gps?: boolean;
    childSeat?: boolean;
  };

};

export type BookingCriteria= {
  carType?: string;  
  features?: string[]; 
  location?: string; 
  priceRange?: string; 
  startDate?: string;
  endDate?: string; 
}

export interface BookingState {
  criteria: BookingCriteria;
  cars: Car[]; 
  bookingData: BookingData | null; 
  bookings: BookingData[] | null;
  loading: boolean;
  error: string | null;
}