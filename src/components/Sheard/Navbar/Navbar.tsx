import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/CarRentalLogo.png";
import logo2 from "../../../assets/Images/CarRentalLogo2.png";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { toggleMenu } from "../../../redux/slices/navbarSlice";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import Sidebar from "./Sidebar";
import { logout as clearUser } from "../../../redux/slices/authSlice";
import { useState } from "react";
import DropDown from "./DropDown";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.navbar);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("Navbar User: ",user)
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle theme handler
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Toggle menu handler
  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      dispatch(clearUser()); // Clear the user from the Redux state
      navigate("/signin"); // Redirect to sign-in after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Close menu handler
  const handleMenuClose = () => {
    if (isMenuOpen) {
      dispatch(toggleMenu()); // Close the menu if open
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="">
      <header
      className={`fixed top-0 left-0 z-10 w-full px-20 py-2 flex justify-between 
      items-center shadow-xl ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Link to="/"><div>
        <img
          src={theme === "dark" ? logo : logo2}
          alt="Logo"
          className="w-32 mr-2"
        />
      </div></Link>
      <div className="space-x-6 items-center hidden lg:block">
        <div className="flex">
          <nav className="space-x-6 text-lg font-semibold">
            <Link
              to="/"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-xl"
                  : "hover:text-xl hover:text-yellow-400"
              }`}
              onClick={handleMenuClose}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-xl"
                  : "hover:text-xl hover:text-yellow-400"
              }`}
              onClick={handleMenuClose}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-xl"
                  : "hover:text-xl hover:text-yellow-400"
              }`}
              onClick={handleMenuClose}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-xl"
                  : "hover:text-xl hover:text-yellow-400"
              }`}
              onClick={handleMenuClose}
            >
              Contact
            </Link>
          </nav>

          <div
            className={`text-xl px-6 pt-1 cursor-pointer hover:text-xl ${
              theme === "dark" ? "hover:text-yellow-400" : ""
            }`}
            onClick={handleThemeToggle}
          >
            {theme === "dark" ? <IoSunny /> : <FaMoon />}
          </div>
        </div>
      </div>

      {/* Sidebar for larger screens */}
      {user && !isDropdownOpen && (
        <div
          className={`${
            isMenuOpen ? "left-0" : "-left-full"
          } fixed top-0 bottom-0 z-10 
         ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}
         px-8 pb-6 pt-0 hidden lg:block mt-[111px]
         transition-transform duration-200 ease-in-out rounded-r-md shadow-xl`}
        >
          <Sidebar />
        </div>
      )}

      <div className="lg:hidden">
        {isMenuOpen ? (
          <HiMenuAlt1
            onClick={handleMenuToggle}
            className="cursor-pointer transition-all"
            size={30}
          />
        ) : (
          <HiMenuAlt3
            onClick={handleMenuToggle}
            className="cursor-pointer transition-all"
            size={30}
          />
        )}
      </div>

      {/* Sign In or Logout Button for large screen*/}
      <div className="lg:block hidden">
        {user ? (
          <div
            className={`hidden lg:block ml-2 mr-20  ${
              theme === "dark"
                ? "hover:text-yellow-400 hover:text-xl"
                : "hover:text-xl"
            }`}
          >
            <div onClick={toggleDropdown} className="cursor-pointer">
              {isDropdownOpen ? (
                <HiMenuAlt1
                  className="cursor-pointer transition-all"
                  size={30}
                />
              ) : (
                <HiMenuAlt3
                  className="cursor-pointer transition-all"
                  size={30}
                />
              )}
            </div>
            {isDropdownOpen && (
              <div
                className={`absolute top-[70px] right-0 w-48 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-lg rounded-md `}
              >
                <ul className="space-y-4 p-3 text-black">
                  <li>
                    <DropDown />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className={`transition-colors duration-100 font-semibold text-xl ${
                        theme === "light"
                          ? "hover:text-xl"
                          : "hover:text-xl text-gray-50 hover:text-yellow-400"
                      }`}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin">
            <button
              className={`${
                theme === "dark"
                  ? "bg-white hover:bg-yellow-400 hover:text-white"
                  : "bg-yellow-400 hover:bg-white"
              } 
            border-2 border-yellow-400 text-black px-4 py-2 mr-2 rounded font-bold`}
            >
              Sign in
            </button>
          </Link>
        )}
      </div>
      {/* Sign In or Logout Button */}
      <div className="lg:hidden">
        {user ? (
          <button
            onClick={handleLogout}
            className={`${
              theme === "dark"
                ? "bg-white hover:bg-yellow-400 hover:text-white"
                : "bg-yellow-400 hover:bg-white"
            } 
border-2 border-yellow-400 text-black px-4 py-2 mr-2 rounded font-bold`}
          >
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <button
              className={`${
                theme === "dark"
                  ? "bg-white hover:bg-yellow-400 hover:text-white"
                  : "bg-yellow-400 hover:bg-white"
              } 
            border-2 border-yellow-400 text-black px-4 py-2 mr-2 rounded font-bold`}
            >
              Sign in
            </button>
          </Link>
        )}
      </div>

      {/* Responsive Sidebar for smaller screens */}
      <div
        className={`${
          isMenuOpen ? "left-0" : "-left-full"
        } fixed top-0 bottom-0 z-20 md:w-1/3 w-1/2 lg:hidden 
         ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}
         px-8 pb-6 mt-16
         transition-transform duration-500 ease-in-out shadow-xl`}
      >
        <nav className="mt-8">
          <ul className="space-y-4 text-xl font-semibold">
            <li>
              <Link
                to="/"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-xl"
                    : "hover:text-xl hover:text-yellow-400"
                }`}
                onClick={handleMenuClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-xl"
                    : "hover:text-xl hover:text-yellow-400"
                }`}
                onClick={handleMenuClose}
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-xl"
                    : "hover:text-xl hover:text-yellow-400"
                }`}
                onClick={handleMenuClose}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-xl"
                    : "hover:text-xl hover:text-yellow-400"
                }`}
                onClick={handleMenuClose}
              >
                Contact
              </Link>
            </li>
          </ul>
          {user && <Sidebar />}
        </nav>
       
          <div
            className={`text-xl py-2 px-8 rounded hover:text-xl  ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
            }`}
            onClick={() => {
              handleThemeToggle();
              handleMenuClose();
            }}
          >
            {theme === "dark" ? <IoSunny /> : <FaMoon />}
          </div>
       
      </div>
    </header>
    </div>
    
  );
};

export default Navbar;
