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


const Navbar = ({ scrollToContact }: { scrollToContact: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.navbar);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);

  // Log user data for debugging
  console.log('User data:', user);

  
  const navigate = useNavigate();

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
       // Call the logout mutation
      dispatch(clearUser()); // Clear the user from the Redux state
      navigate("/signin"); // Redirect to sign-in after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Navigate to contact section
  const handleContactClick = () => {
    navigate("/about");
    setTimeout(() => {
      scrollToContact();
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-10 w-full p-4 flex justify-between items-center shadow-xl ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div>
        <img
          src={theme === "dark" ? logo : logo2}
          alt="Logo"
          className="w-48 mr-2"
        />
      </div>
      <div className="space-x-6 items-center hidden lg:block">
        <div className="flex">
          <nav className="space-x-6 text-xl font-semibold">
            <Link
              to="/"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-2xl"
                  : "hover:text-2xl hover:text-yellow-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-2xl"
                  : "hover:text-2xl hover:text-yellow-400"
              }`}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-2xl"
                  : "hover:text-2xl hover:text-yellow-400"
              }`}
            >
              About Us
            </Link>
            <button
              onClick={handleContactClick}
              className={`transition-colors duration-100 ${
                theme === "light"
                  ? "hover:text-2xl"
                  : "hover:text-2xl hover:text-yellow-400"
              }`}
            >
              Contact
            </button>
          </nav>
          {user && (
            <div
              className={`hidden lg:block ml-6 ${
                theme === "dark"
                  ? "hover:text-yellow-400 hover:text-2xl"
                  : "hover:text-2xl"
              }`}
            >
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
          )}
          <div
            className={`text-xl px-6 pt-1 cursor-pointer hover:text-2xl ${
              theme === "dark" ? "hover:text-yellow-400" : ""
            }`}
            onClick={handleThemeToggle}
          >
            {theme === "dark" ? <IoSunny /> : <FaMoon />}
          </div>
        </div>
      </div>

      {/* Sidebar for larger screens */}
      {user && (
        <div
          className={`${
            isMenuOpen ? "left-0" : "-left-full"
          } fixed top-0 bottom-0 z-20 
         ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}
         px-8 pb-6 pt-16 hidden lg:block mt-28
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

      {/* Sign In or Logout Button */}
      <div>
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
         px-8 pb-6 mt-28
         transition-transform duration-500 ease-in-out shadow-xl`}
      >
        <nav className="mt-8">
          <ul className="space-y-4 text-xl font-semibold">
            <li>
              <Link
                to="/"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-2xl"
                    : "hover:text-2xl hover:text-yellow-400"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-2xl"
                    : "hover:text-2xl hover:text-yellow-400"
                }`}
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-2xl"
                    : "hover:text-2xl hover:text-yellow-400"
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <button
                onClick={handleContactClick}
                className={`transition-colors duration-100 ${
                  theme === "light"
                    ? "hover:text-2xl"
                    : "hover:text-2xl hover:text-yellow-400"
                }`}
              >
                Contact
              </button>
            </li>
          </ul>
          {user && <Sidebar />}
        </nav>
        <div
          className={`text-xl px-6 pt-1 cursor-pointer hover:text-2xl mt-2 ${
            theme === "dark" ? "hover:text-yellow-400" : ""
          }`}
          onClick={handleThemeToggle}
        >
          {theme === "dark" ? <IoSunny /> : <FaMoon />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
