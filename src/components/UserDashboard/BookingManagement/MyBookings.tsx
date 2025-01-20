import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import { getMyBookings } from "../../../redux/slices/bookingSlice";
import { BookingData } from "../../../redux/types/Booking";

const MyBookings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const { loading, error, bookings } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        } text-center text-xl mt-8`}
      >
        No bookings available.
      </div>
    );

  return (
    <div className="p-4 mt-12 overflow-x-auto">
      {!bookings || bookings.length === 0 ? (
        <div className="text-center">No bookings available.</div>
      ) : (
        <div className={`overflow-x-auto p-8  w-full ${
          theme === "dark" ? "bg-white" : "border-black border-2"
        } `}>
          <table className="table-auto border-collapse border ">
            <thead>
              <tr>
                <th className="border border-gray-800 px-4 py-2">Car</th>
                <th className="border border-gray-800 px-4 py-2">Date</th>
                <th className="border border-gray-800 px-4 py-2">Start Time</th>
                <th className="border border-gray-800 px-4 py-2">End Time</th>
                <th className="border border-gray-800 px-4 py-2">Payment Status</th>
                <th className="border border-gray-800 px-4 py-2">Card Number</th>
                <th className="border border-gray-800 px-4 py-2">Expiry</th>
                <th className="border border-gray-800 px-4 py-2">CVV</th>
                <th className="border border-gray-800 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: BookingData) => (
                <tr key={booking.nidOrPassport}>
                  <td className="border border-gray-800 px-4 py-2">{booking.car.name}</td>
                  <td className="border border-gray-800 px-4 py-2">{booking.date}</td>
                  <td className="border border-gray-800 px-4 py-2">{booking.startTime}</td>
                  <td className="border border-gray-800 px-4 py-2">{booking.endTime}</td>
                  <td className="border border-gray-800 px-4 py-2">{booking.paymentStatus}</td>
                  <td className="border border-gray-800 px-4 py-2">
                    {booking.paymentDetails.cardNumber}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">{booking.paymentDetails.expiry}</td>
                  <td className="border border-gray-800 px-4 py-2">{booking.paymentDetails.cvv}</td>
                  <td className="border border-gray-800 px-4 py-2">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
