// src/components/CreateCar.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createCarListing } from "../../redux/slices/carSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { createCar } from "../../redux/types/Cars";
import { useNavigate } from "react-router-dom";

type CreateCarForm = {
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

const CreateCar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Get the navigate function
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const loading = useSelector((state: RootState) => state.cars.loading);
  const error = useSelector((state: RootState) => state.cars.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCarForm>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Helper function to convert file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<CreateCarForm> = async (data) => {
    try {
      let base64Image = "";

      // Check if an image is selected and convert it to Base64
      if (data.image && data.image.length > 0) {
        base64Image = await convertToBase64(data.image[0]);
      } else {
        console.error("Image is required");
        return;
      }

      // Prepare the car data payload including the base64 image
      const carData: createCar = {
        name: data.name,
        description: data.description,
        color: data.color,
        isElectric: data.isElectric,
        features: data.features.split(",").map((feature) => feature.trim()), // Convert string to array
        status: data.status || "available", // Default status
        location: data.location,
        pricePerHour: Number(data.pricePerHour),
        startDate: data.startDate,
        endDate: data.endDate,
        carType: data.carType,
        image: base64Image, // Base64-encoded image
      };

      // Dispatch the createCarListing thunk with carData as JSON
      const resultAction = await dispatch(createCarListing(carData));
      
      // Check if the listing was created successfully
      if (createCarListing.fulfilled.match(resultAction)) {
        // Navigate to the dashboard
        navigate("/admin/dashboard");
      } else {
        console.error("Failed to create car listing:", resultAction.error);
      }
    } catch (err) {
      console.error("Error converting image to Base64:", err);
    }
  };
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
      <div className={`md:pl-48 mx-auto p-4`}>
        <h1 className={`text-3xl font-bold mb-6 text-gray-800 text-center ${theme === "dark" ? "text-yellow-400" : "text-black"}`}>
          Create Car
        </h1>
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white py-20 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Name */}
            <div>
              <label className="block mb-2 font-semibold">Car Name</label>
              <input
                type="text"
                {...register("name", { required: "Car name is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 font-semibold">Image</label>
              <input
                type="file"
                {...register("image", { required: "Car image is required" })}
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
              {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              {imagePreview && (
                <img src={imagePreview} alt="Car Preview" className="mt-4 h-40 object-contain" />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            {/* Color */}
            <div>
              <label className="block mb-2 font-semibold">Color</label>
              <input
                type="text"
                {...register("color", { required: "Color is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.color && <p className="text-red-500">{errors.color.message}</p>}
            </div>

            {/* Is Electric */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("isElectric")}
                className="mr-2 rounded border-gray-300"
              />
              <label className="font-semibold">Is Electric?</label>
            </div>

            {/* Features */}
            <div>
              <label className="block mb-2 font-semibold">Features</label>
              <input
                type="text"
                {...register("features")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comma-separated values"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 font-semibold">Status</label>
              <input
                type="text"
                defaultValue="available"
                {...register("status")}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-semibold">Location</label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>

            {/* Price Per Hour */}
            <div>
              <label className="block mb-2 font-semibold">Price Per Hour</label>
              <input
                type="number"
                {...register("pricePerHour", { required: "Price is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.pricePerHour && <p className="text-red-500">{errors.pricePerHour.message}</p>}
            </div>

            {/* Start Date */}
            <div>
              <label className="block mb-2 font-semibold">Start Date</label>
              <input
                type="date"
                {...register("startDate", { required: "Start date is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-2 font-semibold">End Date</label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>

            {/* Car Type */}
            <div>
              <label className="block mb-2 font-semibold">Car Type</label>
              <input
                type="text"
                {...register("carType", { required: "Car type is required" })}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.carType && <p className="text-red-500">{errors.carType.message}</p>}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-6 bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;
