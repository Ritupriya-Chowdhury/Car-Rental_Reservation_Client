import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hook";
import { fetchUserProfile } from "../../redux/slices/authSlice";
// Import your fetchUserProfile action

const UserProfile = () => {
  const dispatch = useAppDispatch();
 
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  const token = useSelector((state: RootState) => state.auth.token);
  const loading = useSelector((state: RootState) => state.auth.loading); // Assuming you have a loading state in your slice
  const error = useSelector((state: RootState) => state.auth.error); // Assuming you have an error state in your slice

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token)); // Dispatch fetchUserProfile with the token
    }
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error if there is one
  }

  if (!userProfile) {
    return <div>No user profile found.</div>; // Handle case where userProfile is null
  }

  return (
    <div className={`p-4`}>
   
      <div className="bg-white p-6 rounded shadow text-xl">
        <p>
          <strong>Name:</strong> {userProfile.name}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Phone:</strong> {userProfile.phone}
        </p>
        <p>
          <strong>Address:</strong> {userProfile.address}
        </p>
        <p>
          <strong>Status:</strong> {userProfile.status}
        </p>

        <div className="flex text-base">
          <p className="bg-yellow-400 hover:bg-yellow-500  font-bold w-36  h-12  py-3 text-center  mt-4 rounded-lg">
            <Link to="update-profile">Update Profile</Link>
          </p>
          <p className="bg-yellow-400 hover:bg-yellow-500  ml-2  font-bold w-40 h-12 text-center py-3  mt-4 rounded-lg">
            <Link to="change-password">Change Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
