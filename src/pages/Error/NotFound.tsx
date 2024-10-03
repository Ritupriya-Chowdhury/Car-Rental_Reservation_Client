import { Link, useLocation } from 'react-router-dom';
import img from '../../assets/404/istockphoto-1412928542-612x612-removebg-preview.png'

const NotFoundPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || "Page not found.";
  
  return (
    <div className="bg-gray-200">
        <div className="min-h-screen flex flex-col items-center justify-center ">
       <img src={img} alt="" className='md:w-4/12 w-9/12 md:h-4/12 h-9/12' />
       <p className="text-red-600 font-bold text-2xl mb-4">{errorMessage}</p> 
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
    </div>
  );
};

export default NotFoundPage;
