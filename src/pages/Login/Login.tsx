import Logo from "../../assets/Images/CarRentalLogo2.png";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useLoginMutation } from "../../redux/featured/auth/authApi";
import { TUser, setUser } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from 'sonner';


// Validation Schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {

const navigate =useNavigate();


  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const [login] = useLoginMutation();

  // const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId=toast.loading('Logging in');
 try{ 
  const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user=verifyToken(res.token)  as TUser
    dispatch(setUser({user: user, token: res.token}));
    toast.success('Logged in', { id: toastId, duration: 2000 });
    navigate(`/${res.data.role}/dashboard`);
  } catch(err){
    toast.error('Something went wrong', { id: toastId, duration: 2000 });
  }
};

  return (
    <div className="min-h-screen  py-8  bg-gray-100">
      <div className="my-4">
        <div className="md:mx-20 mx-8">
          <img src={Logo} alt="" className="w-40" />
        </div>
        <div className="flex mt-4">
          <Link to="/" className="md:ml-24 ml-12 hover:text-blue-700">
            Home
          </Link>
          <p className="mx-2">&gt;</p>
          <p>Sign In</p>
        </div>
      </div>
      <div className="bg-white p-8   mx-auto rounded shadow-md md:w-7/12   w-9/12">
        <h2 className="text-2xl font-bold mb-8 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-3 py-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 border-2 border-yellow-400 font-bold  text-black py-2 rounded-lg hover:bg-white transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <div>
            <p>Don't have an account?</p>
            <Link
              to="/sign-up"
              className="text-sm text-gray-700 font-bold hover:underline"
            >
              Sign Up Instead
            </Link>
          </div>
          <div className="mt-6">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-700 font-bold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <div className=" mt-12 flex justify-between text-gray-600 mx-12 md:mx-20   border-t-2 pt-8 border-gray-400">
        <div className="md:flex  lg:space-x-6 md:space-x-2 md:space-y-0 space-y-2">
          <div>
            <p className="text-sm ">Privacy Policy & Cookies Policy</p>
          </div>
          <div>
            <p>Terms & Conditions</p>
          </div>
          <div>
            <p>Careers</p>
          </div>
        </div>

        <div className="md:flex lg:space-x-6 md:space-x-2 md:space-y-0 space-y-2">
          <p
            className=" 
               md:p-2 "
          >
            <FaFacebookF size={24} />
          </p>
          <p
            className=" 
               md:p-2 "
          >
            <FaLinkedin size={24} />
          </p>
          <p
            className=" 
                md:p-2  "
          >
            <FaInstagram size={24} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
