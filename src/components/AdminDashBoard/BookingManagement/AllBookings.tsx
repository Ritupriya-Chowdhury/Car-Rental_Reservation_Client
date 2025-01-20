import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import { getAllBookings } from "../../../redux/slices/bookingSlice";
import { BookingData } from "../../../redux/types/Booking";

const AllBookings = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { loading, error, bookings } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const isBookingExpired = (date: string,  endTime: string) => {
    const currentDate = new Date();
  
    const bookingEnd = new Date(`${date}T${endTime}`);

    return currentDate > bookingEnd; // Check if the booking end time has passed
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        } text-center`}
      >
        {error || "An error occurred while fetching bookings."}
      </div>
    );

  return (
    <div className="p-8 mt-8 bg-gray-100 mx-2">
      {!bookings || bookings.length === 0 ? (
        <div className="text-center">No bookings available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-2 py-2">Car</th>
                <th className="border border-gray-300 px-2 py-2">User</th>
                <th className="border border-gray-300 px-2 py-2">Date</th>
                <th className="border border-gray-300 px-2 py-2">Start Time</th>
                <th className="border border-gray-300 px-2 py-2">End Time</th>
                <th className="border border-gray-300 px-2 py-2">
                  Payment Status
                </th>
                <th className="border border-gray-300 px-2 py-2">Status</th>
                <th className="border border-gray-300 px-2 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: BookingData, index: number) => {
                const expired = isBookingExpired(
                  booking.date,
                  booking.startTime,
                  
                );

                return (
                  <tr
                    key={booking.nidOrPassport}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 px-2 py-2">
                      {booking.car.name}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {booking.user.name}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {booking.date}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {booking.startTime}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {booking.endTime}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {booking.paymentStatus}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {expired ? "Canceled" : booking.status}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          disabled={expired}
                          className={`${
                            expired
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "border border-green-500 bg-green-100 hover:bg-green-300 text-green-700"
                          } rounded-lg px-2 py-1`}
                        >
                          Approve
                        </button>
                        <button className="border border-red-500 bg-red-100 hover:bg-red-300 hover:text-red-700 text-red-700 rounded-lg px-2 py-1">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
