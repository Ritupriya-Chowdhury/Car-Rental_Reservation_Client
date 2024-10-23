import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBooking, confirmBooking } from "../../redux/slices/bookingSlice"; 
import { RootState } from "../../redux/store"; 
import { useAppDispatch } from "../../redux/hook";
import Swal from "sweetalert2";

const ConfirmationPage = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookingId=id;

  const { bookingData, loading, error } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (id) {
      dispatch(getBooking(id)); // Fetch booking details by ID
    }
  }, [id, dispatch]);

  const handleConfirmBooking = async () => {
    if (!bookingId) {
      // Handle the case where bookingId is undefined
      Swal.fire({
        title: "Error!",
        text: "Booking ID is not available.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    try {
      const resultAction = await dispatch(confirmBooking(bookingId));
      console.log(resultAction)
      if (confirmBooking.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Success!",
          text: "Your booking has been confirmed.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/booking");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to confirm your booking.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancelBooking = () => {
    // Show cancel notification
    Swal.fire({
      title: "Cancelled",
      text: "Your booking has not been confirmed.",
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/bookings"); 
    });
  };

  // Display loading state
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Display error state
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching booking details: {error}</p>
      </div>
    );
  }

  // Check if bookingData is available
  if (!bookingData) {
    return (
      <div className="text-center">
        <p>No booking data available.</p>
      </div>
    );
  }

  return (
    <div className={`${theme==='dark'?'bg-gray-700':'bg-gray-200'}`}>
      <div className="px-6 lg:pl-64 md:pl-52 md:py-28 py-12 min-h-screen">
      <h1 className={`text-3xl font-bold mb-4 ${theme==='dark'?'text-yellow-400':'text-black'}`}>Booking Confirmation</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Booking Details:</h2>
        <div className="mb-4">
          <p><strong>Car ID:</strong> {bookingData.carId}</p>
          <p><strong>Date:</strong> {bookingData.date}</p>
          <p><strong>Start Time:</strong> {bookingData.startTime}</p>
          <p><strong>End Time:</strong> {bookingData.endTime}</p>
          <p><strong>NID/Passport:</strong> {bookingData.nidOrPassport}</p>
          <p><strong>Driving License:</strong> {bookingData.drivingLicense}</p>
          <p><strong>Payment Card Number:</strong> {bookingData.paymentDetails.cardNumber.replace(/\d(?=\d{4})/g, "*")}</p> {/* Masking card number */}
          <p><strong>GPS:</strong> {bookingData.additionalOptions.gps ? "Yes" : "No"}</p>
          <p><strong>Child Seat:</strong> {bookingData.additionalOptions.childSeat ? "Yes" : "No"}</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleConfirmBooking}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
          >
            Confirm Booking
          </button>
          <button
            onClick={handleCancelBooking}
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-200"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmationPage;
