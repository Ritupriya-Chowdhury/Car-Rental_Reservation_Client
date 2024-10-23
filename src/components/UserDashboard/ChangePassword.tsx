import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { changePassword, resetPasswordChangeState, useAuthError, usePasswordChangeSuccess } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const passwordChangeSuccess = useSelector(usePasswordChangeSuccess);
  const authError = useSelector(useAuthError);
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission to dispatch the changePassword action
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Dispatch the changePassword thunk
    dispatch(changePassword({ oldPassword, newPassword }));
  };

  // Handle success and error states from the Redux slice
  useEffect(() => {
    if (passwordChangeSuccess) {
      setSuccessMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setLoading(false);

      // Reset the success state and navigate to dashboard
      setTimeout(() => {
        dispatch(resetPasswordChangeState());
        navigate("/user/dashboard");
      }, 1500);  // 1.5 seconds delay before redirect
    }

    if (authError) {
      setLoading(false);
    }
  }, [passwordChangeSuccess, authError, navigate, dispatch]);

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="bg-white p-8 mx-auto rounded shadow-md md:w-7/12 w-9/12">
        <h2 className="text-2xl font-bold mb-8 text-center">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label htmlFor="old-password" className="block text-gray-700">
              Old Password
            </label>
            <div className="relative">
              <input
                id="old-password"
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {authError && <p className="text-red-500 text-sm mt-1">{authError}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 border-2 border-yellow-400 font-bold text-black py-2 rounded-lg hover:bg-white transition-colors"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
