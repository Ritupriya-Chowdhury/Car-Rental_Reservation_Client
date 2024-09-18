import { Link } from 'react-router-dom';
import { sidebarItemsGenerator } from '../../../utils/navberItemsGenerator';
import { adminPaths } from '../../../routes/adminPaths';
import { userPaths } from '../../../routes/userPaths';
import { TNavbarItem } from '../../../types/NavberTypes';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';


const userRole = {
  ADMIN: 'admin',
  USER: 'user',
};

const Sidebar = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const role = 'user'; // example role
  let sidebarItems: TNavbarItem[] = []; // explicitly typing sidebarItems as an array of TNavbarItem

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <div className="lg:mt-0 mt-4">
    
      <ul className="space-y-4 text-xl font-semibold">
        {sidebarItems.map((item: TNavbarItem) => (
          <li key={item.key} className={`transition-colors duration-100 ${
            theme === "light" ? "hover:text-yellow-500" : "hover:text-yellow-400"
          }`}>
            <Link to={item.path ?? '#'} className="block">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
