import { Link } from 'react-router-dom';
import { sidebarItemsGenerator } from '../../../utils/navberItemsGenerator';
import { TNavbarItem } from '../../../types/NavberTypes';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';
import { userSidebarPaths } from '../../../routes/userSidebarPaths';
import { adminSidebarPaths } from '../../../routes/adminSidebarPaths';


const userRole = {
  ADMIN: 'admin',
  USER: 'user',
};

const Sidebar = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const role = user?.role; // example role
  let sidebarItems: TNavbarItem[] = []; // explicitly typing sidebarItems as an array of TNavbarItem

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminSidebarPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userSidebarPaths, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <div className="lg:mt-0 mt-4">
    
      <ul className="space-y-4 text-xl font-semibold">
        {sidebarItems.map((item: TNavbarItem) => (
          <li key={item.key} className={`transition-colors duration-100 ${
            theme === "light" ? "hover:text-2xl" : "hover:text-2xl hover:text-yellow-400"
          }`}>
            <Link to={item.path ?? '#'} className="block">
              {item.label}
            </Link>
          </li>
        ))}
        <li  className={`transition-colors duration-100 ${
            theme === "light" ? "hover:text-2xl" : "hover:text-2xl hover:text-yellow-400" }`}>
            <Link to='/booking'>Booking</Link>


        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
