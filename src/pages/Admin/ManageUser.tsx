import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hook'; 
import { RootState } from '../../redux/store';
import { changeRole, deletion, fetchAllUsers, updateUserStatus } from '../../redux/slices/userManagementSlice';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  role: string;
}

const ManageUser = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.userManagement.users); 
  const [loadingAction, setLoadingAction] = useState<string | null>(null); // Tracks which action is in progress
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  // Fetch users from Redux store
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, users.length]);

  // Handle making a user an admin
  const makeAdmin = async (email: string) => {
    setLoadingAction('makeAdmin');
    try {
      await dispatch(changeRole(email));  // Dispatching email directly as expected
      alert(`${email} has been made an admin.`);
    } catch (error) {
      console.error('Error making user admin:', error);
      alert('Failed to make admin');
    } finally {
      setLoadingAction(null); // Reset the loading action state
    }
  };

  // Handle blocking a user
  const blockUser = async (email: string) => {
    setLoadingAction('blockUser');
    try {
      await dispatch(updateUserStatus(email));  // Dispatching email directly as expected
      alert(`${email} has been blocked.`);
    } catch (error) {
      console.error('Error blocking user:', error);
      alert('Failed to block user');
    } finally {
      setLoadingAction(null); // Reset the loading action state
    }
  };

  // Handle deleting a user
  const deleteUser = async (email: string) => {
    setLoadingAction('deleteUser');
    try {
      await dispatch(deletion(email));  // Dispatching email directly as expected
      alert(`${email} has been deleted.`);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    } finally {
      setLoadingAction(null); // Reset the loading action state
    }
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} min-h-screen md:pl-48 px-4 py-8`}>
      <h1 className={`text-2xl font-bold mb-4 text-left ${theme === "dark" ? "text-yellow-400" : "text-black"}`}>
        User Management
      </h1>

      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
       <div className='bg-white p-16 mx-4 overflow-x-auto'>
         <table className="  border border-gray-300 shadow-md overflow-x-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-700">Name</th>
              <th className="p-2 border border-gray-700">Email</th>
              <th className="p-2 border border-gray-700">Phone</th>
              <th className="p-2 border border-gray-700">Address</th>
              <th className="p-2 border border-gray-700">Status</th>
              <th className="p-2 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.email}>
                <td className="p-2 border border-gray-700">{user.name}</td>
                <td className="p-2 border border-gray-700">{user.email}</td>
                <td className="p-2 border border-gray-700">{user.phone}</td>
                <td className="p-2 border border-gray-700">{user.address}</td>
                <td className="p-2 border border-gray-700">{user.status}</td>
                <td className="flex p-2 border border-gray-700">
                  <button
                    onClick={() => makeAdmin(user.email)}
                    className="bg-blue-500 text-white px-2 py-2 rounded mr-2"
                    disabled={loadingAction === 'makeAdmin' || user.role === 'admin'}
                  >
                    {loadingAction === 'makeAdmin' ? 'Making Admin...' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => blockUser(user.email)}
                    className="bg-yellow-500 text-white px-2 py-2 rounded mr-2"
                    disabled={loadingAction === 'blockUser' || user.status === 'blocked'}
                  >
                    {loadingAction === 'blockUser' ? 'Blocking...' : 'Block User'}
                  </button>
                  <button
                    onClick={() => deleteUser(user.email)}
                    className="bg-red-500 text-white px-2 py-2 rounded"
                    disabled={loadingAction === 'deleteUser'}
                  >
                    {loadingAction === 'deleteUser' ? 'Deleting...' : 'Delete User'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      )}
    </div>
  );
};

export default ManageUser;
