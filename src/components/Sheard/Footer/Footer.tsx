import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MdPhoneInTalk } from "react-icons/md";
import { IoIosMailOpen } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import logo from "../../../assets/Images/CarRentalLogo.png";
import logo2 from "../../../assets/Images/CarRentalLogo2.png";

const Footer = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <footer
      className={`px-8  ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
    >
    <div className={`border-b-2 pb-12 py-20 ${
        theme==='dark'?"border-white":"border-black"
    }`}>
    <div
        className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3
        border border-black w-11/12 mx-auto rounded-md shadow-md 
        ${
          theme == "dark" ? "bg-gray-400 text-black" : "bg-gray-600 text-white"
        } p-8`}
      >
        <div
          className={`flex border-r-2  ${
            theme === "dark" ? "border-gray-700" : "border-gray-400"
          }`}
        >
          <div className="w-12 h-12 text-3xl rounded-full bg-yellow-500 p-2 mt-1">
            <MdPhoneInTalk />
          </div>
          <div className="pl-2 text-xl font-bold">
            <p className="pl-1">Call Us</p>
            <p
              className={`${
                theme === "dark" ? "text-gray-700" : "text-gray-400"
              }`}
            >
              +880-16734-57896
            </p>
          </div>
        </div>
        <div
          className={`flex border-r-2 ${
            theme === "dark" ? "border-gray-700" : "border-gray-400"
          }`}
        >
          <div className="w-12 h-12 text-3xl rounded-full bg-yellow-500 p-2 mt-1">
            <IoIosMailOpen />
          </div>
          <div className="pl-2 text-xl font-bold">
            <p className="pl-1">Contact Our Team</p>
            <p
              className={`${
                theme === "dark" ? "text-gray-700" : "text-gray-400"
              }`}
            >
              rp@gmail.com
            </p>
          </div>
        </div>
        <div
          className={`flex border-r-2 ${
            theme === "dark" ? "border-gray-700" : "border-gray-400"
          }`}
        >
          <div className="w-12 h-12 text-3xl rounded-full bg-yellow-500 p-2 md:mt-1 mt-2">
            <IoLocation />
          </div>
          <div className="pl-2 text-xl font-bold ">
            <p className="pl-1">Location</p>
            <p
              className={`${
                theme === "dark" ? "text-gray-700" : "text-gray-400"
              }`}
            >
              Boalkhali, Chattogram
            </p>
          </div>
        </div>
      </div>
      <div
        className=" mx-auto mt-20  grid lg:grid-cols-3 grid-cols-1
       items-center space-y-12 lg:space-y-0"
      >
        {/* Social Media Links */}
        <div>
          <div className="mb-8">
            <img
              src={`${theme === "dark" ? logo : logo2}`}
              alt=""
              className="w-40"
            />
            <p className={`mt-4 text-lg font-semibold ml-1`}>
              At RPCarRes Car Rentals, we're committed to delivering the perfect
              ride, whether you're embarking on a road trip adventure or
              cruising through the heart of the city.
            </p>
          </div>
          <div className="flex space-x-6">
            <p
              className={` transition-colors duration-100 
              border-2  p-2 rounded-full 
              ${theme==='dark'?'border-yellow-500 hover:bg-yellow-500 '
              :'border-yellow-500 bg-yellow-500 hover:bg-white'}`}
            >
              <FaFacebookF size={24} />
            </p>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={` transition-colors duration-100 
              border-2  p-2 rounded-full 
              ${theme==='dark'?'border-yellow-500 hover:bg-yellow-500 '
              :'border-yellow-500 bg-yellow-500 hover:bg-white'}`}
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={` transition-colors duration-100 
              border-2  p-2 rounded-full 
              ${theme==='dark'?'border-yellow-500 hover:bg-yellow-500 '
              :'border-yellow-500 bg-yellow-500 hover:bg-white'}`}
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="lg:mx-auto mx-4 space-y-4 ">
          <p className="text-2xl font-bold">Important Links</p>
          <div className=" text-lg text-left font-semibold">
            <ul className="space-y-4 text-xl font-semibold pl-4">
              <li>
                <Link
                  to="/"
                  className={` transition-colors duration-300 p-1 rounded-lg ${
                    theme === "light"
                      ? "hover:border-yellow-500 hover:bg-yellow-500 "
                      : "hover:text-yellow-400"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={` transition-colors duration-300 p-1 rounded-lg ${
                    theme === "light"
                      ? "hover:border-yellow-500 hover:bg-yellow-500 "
                      : "hover:text-yellow-400"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className={` transition-colors duration-300 p-1 rounded-lg ${
                    theme === "light"
                      ? "hover:border-yellow-500 hover:bg-yellow-500 "
                      : "hover:text-yellow-400"
                  }`}
                >
                  Booking
                </Link>
              </li>
              <li className="">
                <Link
                  to="/contact"
                  className={` transition-colors duration-300 p-1 rounded-lg ${
                    theme === "light"
                      ? "hover:border-yellow-500 hover:bg-yellow-500 "
                      : "hover:text-yellow-400"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Subscribe */}
        <div className="mx-auto">
          <p className="text-2xl font-bold mb-4">Subscribe</p>
          <p className="mt-4 text-lg font-semibold ml-1">
            Interested in receiving updates about our services? Simply subscribe
            and we'll keep you informed via email.
          </p>
          <div className="mt-4">
            <input type="email" placeholder="Enter Your Email" className={`p-4 rounded-lg border-2 transition duration-300 
            ${theme==='dark'?"bg-gray-700 text-white border-yellow-500 ":
            " text-black border-yellow-500 hover:bg-white "}`} />
            <button className={`border-2 ml-2 px-2 py-3 lg:mt-2 md:mt-0 mt-3  text-lg font-bold rounded-lg
            ${theme==='dark'?"border-yellow-500 hover:bg-yellow-500 hover:text-black "
            :"border-yellow-500 bg-yellow-500 hover:bg-white  "}`}>Subscribe</button>
          </div>
        </div>
      </div>

    </div>
      <div className="mt-6 pb-12 text-center text-lg opacity-75">
        &copy; {new Date().getFullYear()} Car Rental Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
