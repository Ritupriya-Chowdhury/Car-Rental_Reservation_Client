import { useState } from "react";
import { HiMenuAlt3, HiMenuAlt2 } from "react-icons/hi";
import { IoSunny } from "react-icons/io5";
import { FaMoon, FaUsers } from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import { logout as clearUser } from "../../../redux/slices/authSlice";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Theme toggle handler
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
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

  // Close sidebar after option click (for mobile)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false); // Close sidebar if it's a mobile screen
    }
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed top-0 left-0 h-full md:w-44 w-6/12 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          } shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 mt-8">
            <h2 className="text-2xl font-semibold">User Panel</h2>
            {/* Sidebar content here */}
            <ul className="mt-4 text-xl">
              <li
                className={`py-2 px-4 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                } rounded flex`}
                onClick={handleLinkClick}
              >
                <div className="mr-2 mt-1">
                  <IoHome />
                </div>
                <div>
                  <Link to="/">Home</Link>
                </div>
              </li>
              <li
                className={`py-2 px-4 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                } rounded flex`}
                onClick={handleLinkClick}
              >
                <div className="mr-2 mt-1">
                  <MdDashboard />
                </div>
                <div>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </div>
              </li>
              <li
                className={`py-2 px-4 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                } rounded flex`}
                onClick={handleLinkClick}
              >
                <div className="mr-2 mt-1"><MdLibraryBooks /></div>
                <div>
                  <Link to="/booking">Booking</Link>
                </div>
              </li>
              <li
                className={`py-2 px-4 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                } rounded flex`}
                onClick={handleLinkClick}
              >
                <div className="mr-2 mt-3"><FaUsers /></div>
                <div>
                  <Link to="/admin/user-management">Manage User</Link>
                </div>
              </li>

              {/* Theme Toggle Button */}
              <li>
                <div
                  className={`text-xl py-2 px-8 rounded hover:text-2xl  ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    handleThemeToggle();
                    handleLinkClick();
                  }}
                >
                  {theme === "dark" ? <IoSunny /> : <FaMoon />}
                </div>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={`py-2 px-4  ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
                  } rounded `}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar Toggle Button for Mobile View */}
        <div>
          <button
            className={`md:hidden focus:outline-none text-3xl ${
              theme === "dark" ? "text-white" : "text-black"
            }  ml-[280px] pt-4`}
            onClick={toggleSidebar}
          >
            {isOpen ? <HiMenuAlt2 /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
