import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {  CreateBookingData } from "../../redux/types/Booking";
import { createBooking } from "../../redux/slices/bookingSlice";
import { useLocation, useNavigate } from "react-router-dom";

const schema: yup.ObjectSchema<CreateBookingData> = yup.object().shape({
  carId: yup.string().optional(),
  nidOrPassport: yup.string().required("NID/Passport is required"),
  drivingLicense: yup.string().required("Driving License is required"),
  paymentDetails: yup.object().shape({
    cardNumber: yup.string().required("Card Number is required"),
    expiry: yup.string().required("Expiry Date is required"),
    cvv: yup.string().required("CVV is required"),
  }),
  date: yup.string().required("Date is required"),
  startTime: yup.string().required("Start Time is required"),
  additionalOptions: yup.object().shape({
    gps: yup.boolean(),
    childSeat: yup.boolean(),
  })
});

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const location = useLocation();
  const carId = location.state?.carId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CreateBookingData>({
    resolver: yupResolver(schema),
  });

  const theme = useAppSelector((state: RootState) => state.theme.theme);

  const onSubmit: SubmitHandler<CreateBookingData> = async (data) => {
   
    const bookingData: CreateBookingData = {
      carId: carId,
      nidOrPassport: data.nidOrPassport,
      drivingLicense: data.drivingLicense,
      paymentDetails: {
        cardNumber: data.paymentDetails.cardNumber,
        expiry: data.paymentDetails.expiry,
        cvv: data.paymentDetails.cvv,
      },
      date: data.date,
      startTime: data.startTime,
      additionalOptions: {
        gps: data.additionalOptions?.gps || false,
        childSeat: data.additionalOptions?.childSeat || false,
      },
    };

 
   
    try {
      
      const resultAction = await dispatch(createBooking(bookingData));
     
     
      if (createBooking.fulfilled.match(resultAction)) {
      
        navigate(`/booking/${resultAction.payload._id}`);
      } else {
     
        console.error("Failed to create booking:", resultAction.error);
      }
    } catch (error) {
    
      console.error("An error occurred during booking:", error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const currentOptions = getValues("additionalOptions") || { gps: false, childSeat: false };

    setValue("additionalOptions", {
      ...currentOptions,
      [value]: checked,
    });
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-500" : "bg-white"
      } md:pl-48 md:pr-4 px-4 md:py-8 py-4 min-h-screen`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white px-4 py-8 rounded-lg"
      >
        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">NID/Passport</label>
          <input
            type="text"
            {...register("nidOrPassport")}
            className={`mt-1 block w-full p-2 border ${errors.nidOrPassport ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.nidOrPassport && (
            <p className="text-red-500 text-xs">{errors.nidOrPassport.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Driving License</label>
          <input
            type="text"
            {...register("drivingLicense")}
            className={`mt-1 block w-full p-2 border ${errors.drivingLicense ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.drivingLicense && (
            <p className="text-red-500 text-xs">{errors.drivingLicense.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Information</label>
          <input
            type="text"
            {...register("paymentDetails.cardNumber")}
            placeholder="Card Number"
            className={`mt-1 block w-full p-2 border ${errors.paymentDetails?.cardNumber ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.paymentDetails?.cardNumber && (
            <p className="text-red-500 text-xs">{errors.paymentDetails.cardNumber.message}</p>
          )}
          <input
            type="text"
            {...register("paymentDetails.expiry")}
            placeholder="Expiry Date (MM/YY)"
            className={`mt-1 block w-full p-2 border ${errors.paymentDetails?.expiry ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.paymentDetails?.expiry && (
            <p className="text-red-500 text-xs">{errors.paymentDetails.expiry.message}</p>
          )}
          <input
            type="text"
            {...register("paymentDetails.cvv")}
            placeholder="CVV"
            className={`mt-1 block w-full p-2 border ${errors.paymentDetails?.cvv ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.paymentDetails?.cvv && (
            <p className="text-red-500 text-xs">{errors.paymentDetails.cvv.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register("date")}
            className={`mt-1 block w-full p-2 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            {...register("startTime")}
            className={`mt-1 block w-full p-2 border ${errors.startTime ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.startTime && (
            <p className="text-red-500 text-xs">{errors.startTime.message}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Options</label>
          <div className="flex flex-col space-y-2">
            <label>
              <input
                type="checkbox"
                value="gps"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              GPS
            </label>
            <label>
              <input
                type="checkbox"
                value="childSeat"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Child Seat
            </label>
          </div>
          {errors.additionalOptions && (
            <p className="text-red-500 text-xs">{errors.additionalOptions.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold p-2 rounded-md hover:bg-yellow-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
