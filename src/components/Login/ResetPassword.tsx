import { useForm, SubmitHandler } from "react-hook-form"; 
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/featured/auth/authApi";

// Define the type for your form inputs
type IResetPasswordInputs = {
  password: string;
  confirmPassword: string;
};

// Validation schema for resetting password
const schema = yup.object().shape({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm your password"),
});

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordInputs>({
    resolver: yupResolver(schema),
  });

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<IResetPasswordInputs> = async (data) => {
    if (!token) {
      console.error("Token is missing!");
      return; // Prevent submission if token is undefined
    }
    
    try {
      await resetPassword({ token, newPassword: data.password }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="my-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Reset Password</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 mx-auto rounded shadow-md md:w-7/12 w-9/12"
        >
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-3 py-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`w-full px-3 py-2 border rounded ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 border-2 border-yellow-400 font-bold text-black py-2 rounded-lg hover:bg-white transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
