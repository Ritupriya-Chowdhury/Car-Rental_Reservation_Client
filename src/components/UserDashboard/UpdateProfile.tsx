import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserProfile, updateProfile, resetProfileUpdateState, useUserProfile, useProfileUpdateSuccess, useProfileUpdateError } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

// Validation schema for profile form
const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

const UpdateProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();
  const userProfile = useSelector(useUserProfile); // Fetch current user profile from state
  const updateProfileSuccess = useSelector(useProfileUpdateSuccess);
  const updateProfileError = useSelector(useProfileUpdateError);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch user profile on component mount if not already loaded
  useEffect(() => {
    if (!userProfile) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(fetchUserProfile(token));
      }
    }
  }, [userProfile, dispatch]);

  // Initialize form with react-hook-form and yup validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name || "", // Set default value to the current user profile or empty
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
    },
  });

  // Reset form whenever the userProfile data changes
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name,
        phone: userProfile.phone,
        address: userProfile.address,
      });
    }
  }, [userProfile, reset]);


  const onSubmit = (data: { name: string; phone: string; address: string }) => {
    setLoading(true);
    dispatch(updateProfile(data));
  };

  // 
  useEffect(() => {
    if (updateProfileSuccess) {
      setSuccessMessage("Profile updated successfully!");
      setLoading(false);
      setTimeout(() => {
        dispatch(resetProfileUpdateState());
        navigate("/user/dashboard");
      }, 1500); 
    }

    if (updateProfileError) {
      setLoading(false);
      setSuccessMessage(null);
    }
  }, [updateProfileSuccess, updateProfileError, dispatch, navigate]);

  return (
    <div className={`min-h-screen py-8   ${theme==='dark'?'bg-gray-700':'bg-gray-200'}`}>
      <div className="bg-white p-8 md:ml-52 lg:my-12 md:my-40 mx-auto rounded shadow-md md:w-7/12 w-9/12">
        <h2 className="text-2xl font-bold mb-8 text-center">Update Profile</h2>
        
        {successMessage && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
            {successMessage}
          </div>
        )}


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              id="phone"
              type="text"
              className={`w-full p-2 border rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
              {...register("phone")}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Address</label>
            <input
              id="address"
              type="text"
              className={`w-full p-2 border rounded ${errors.address ? "border-red-500" : "border-gray-300"}`}
              {...register("address")}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500 transition"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
