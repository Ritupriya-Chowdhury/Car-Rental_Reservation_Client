import { useForm, SubmitHandler } from "react-hook-form"; // Updated import
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { toast } from "sonner"; // Uncomment if using a toast notification library
import { useForgotPasswordMutation } from "../../redux/featured/auth/authApi";

// Define the type for your form inputs
type IForgotPasswordInputs = {
  email: string;
};

// Validation schema for email
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordInputs>({
    resolver: yupResolver(schema),
  });

  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<IForgotPasswordInputs> = async (data) => {
   
    try {
      await forgotPassword(data.email ).unwrap(); // Corrected syntax
      // toast.success("Recovery email sent", { id: toastId }); // Uncomment to show success toast
    } catch (err: any) {
      console.log("error:",err);
      // toast.error("Failed to send recovery email", { id: toastId }); // Uncomment to show error toast
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="my-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Forgot Password</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 mx-auto rounded shadow-md md:w-7/12 w-9/12"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-3 py-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 border-2 border-yellow-400 font-bold text-black py-2 rounded-lg hover:bg-white transition-colors"
          >
            Send Recovery Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
