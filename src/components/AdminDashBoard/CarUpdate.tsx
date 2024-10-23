// src/components/CarUpdate.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCarDetails, updateCarListing } from "../../redux/slices/carSlice"; // Ensure this is implemented in your carSlice
import { useAppDispatch } from "../../redux/hook";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCar } from "../../redux/types/Cars";

type CarUpdateForm = {
  name: string;
  image: FileList;
  description: string;
  color: string;
  isElectric: boolean;
  features: string;
  status: string;
  location: string;
  pricePerHour: number;
  startDate: string;
  endDate: string;
  carType: string;
  
};

const CarUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  console.log(id)
  
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { carDetails, loading, error } = useSelector(
    (state: RootState) => state.cars
  );
  
  // Get the car details from the Redux store
  useEffect(() => {
    if (id) {
      dispatch(fetchCarDetails(id));
    }
  }, [id, dispatch]);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Added reset for setting default values
  } = useForm<CarUpdateForm>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (carDetails) {
      reset({
        name: carDetails.name,
        description: carDetails.description,
        color: carDetails.color,
        isElectric: carDetails.isElectric,
        features: carDetails.features.join(", "), // Assuming features is an array
        status: carDetails.status,
        location: carDetails.location,
        pricePerHour: carDetails.pricePerHour,
        startDate: carDetails.startDate.split("T")[0], // Convert to "yyyy-MM-dd"
        endDate: carDetails.endDate.split("T")[0], // Convert to "yyyy-MM-dd"
        carType: carDetails.carType,
      });
    }
  }, [reset, carDetails]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<CarUpdateForm> = async (data) => {
    if (!id) {
      console.error("Car ID is missing.");
      return; // Or handle the error in your UI
    }
  
    // Ensure carDetails is not null
    if (!carDetails) {
      console.error("Car details are missing.");
      return; // Or handle the error in your UI
    }
  
    try {
      let base64Image = imagePreview;
  
      if (data.image && data.image.length > 0) {
        base64Image = await convertToBase64(data.image[0]);
      }
  
  
      const {
        name: existingName,
        description: existingDescription,
        color: existingColor,
        isElectric: existingIsElectric,
        features: existingFeatures,
        status: existingStatus,
        location: existingLocation,
        pricePerHour: existingPricePerHour,
        startDate: existingStartDate,
        endDate: existingEndDate,
        carType: existingCarType,
        image: existingImage,
      } = carDetails;
  
      // Create carData with existing values when data is not provided
      const carData: createCar = {
        name: data.name || existingName,
        description: data.description || existingDescription,
        color: data.color || existingColor,
        isElectric: data.isElectric !== undefined ? data.isElectric : existingIsElectric,
        features: data.features ? data.features.split(",").map((feature) => feature.trim()) : existingFeatures,
        status: data.status || existingStatus || "available",
        location: data.location || existingLocation,
        pricePerHour: data.pricePerHour ? Number(data.pricePerHour) : existingPricePerHour,
        startDate: data.startDate || existingStartDate,
        endDate: data.endDate || existingEndDate,
        carType: data.carType || existingCarType,
        image: base64Image || existingImage,
      };

      // Dispatch the action to update the car listing
      const resultAction = await dispatch(updateCarListing({ id, carData }));
  
      if (updateCarListing.fulfilled.match(resultAction)) {
        navigate("/admin/dashboard");
      } else {
        console.error("Failed to update car listing:", resultAction.error);
      }
    } catch (err) {
      console.error("Error converting image to Base64:", err);
    }
  };
  
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
      <div className={`md:pl-48 mx-auto p-4`}>
        <h1 className={`text-3xl font-bold mb-6 text-gray-800 text-center ${theme === "dark" ? "text-yellow-400" : "text-black"}`}>
          Update Car
        </h1>
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white py-20 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Car Name</label>
              <input
                type="text"
                {...register("name")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Image</label>
              <input
                type="file"
                {...register("image")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => setImagePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Car Preview" className="mt-4 h-40 object-contain" />
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                {...register("description")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Color</label>
              <input
                type="text"
                {...register("color")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.color && <p className="text-red-500">{errors.color.message}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("isElectric")}
                className="mr-2 rounded border-gray-300"
              />
              <label className="font-semibold">Is Electric?</label>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Features</label>
              <input
                type="text"
                {...register("features")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comma-separated values"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Status</label>
              <input
                type="text"
                {...register("status")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Location</label>
              <input
                type="text"
                {...register("location")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Price Per Hour</label>
              <input
                type="number"
                {...register("pricePerHour")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.pricePerHour && <p className="text-red-500">{errors.pricePerHour.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Start Date</label>
              <input
                type="date"
                {...register("startDate")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">End Date</label>
              <input
                type="date"
                {...register("endDate")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Car Type</label>
              <input
                type="text"
                {...register("carType")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-center"><button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded mt-4 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
             {loading ? "Updating..." : "Update"}
          </button></div>
        </form>
      </div>
    </div>
  );
};

export default CarUpdate;
