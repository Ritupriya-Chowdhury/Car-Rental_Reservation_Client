import  { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import { getMyBookings } from "../../../redux/slices/bookingSlice";
import { BookingData } from "../../../redux/types/Booking";


const MyBookings = () => {
    const dispatch = useAppDispatch();
     const { loading, error, bookings } = useSelector((state: RootState) => state.booking);
  
    
  
    useEffect(() => {
     dispatch(getMyBookings());
    }, [dispatch]);

   
  
    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className=" p-4 mt-12 ">
      
      {!bookings || bookings.length === 0 ? (
        <div className="text-center">No bookings available.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking: BookingData) => (
            <div key={booking.nidOrPassport} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold">Car: {booking.car.name}</h3>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Start Time:</strong> {booking.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {booking.endTime}
              </p>
              <p>
                <strong>Payment Status:</strong> {booking.paymentStatus}
              </p>
              <div>
                <strong>Payment Details:</strong> 
               <p>Card Number : {booking.paymentDetails.cardNumber}</p>
                <p>Expiry : {booking.paymentDetails.expiry}</p>
               <p>CVV : {booking.paymentDetails.cvv}</p>
              </div>
              
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              
             
              
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyBookings;
