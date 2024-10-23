import ConfirmationPage from "../components/Booking/Confirmation";
import Booking from "../pages/Booking/Booking";
import BookingForm from "../pages/Booking/BookingForm";


export const bothPaths=[
    
    {
      name:'Booking',
      path: "booking",
      element: <Booking />,
    },
    {
      name:'Booking Form',
      path: "booking/booking-form",
      element: <BookingForm />,
    },
    {
      name:'Confirmation',
      path: "booking/:id",
      element: <ConfirmationPage />,
    },

  ]