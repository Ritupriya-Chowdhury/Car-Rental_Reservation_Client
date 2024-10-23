import { NavLink } from 'react-router-dom';
import { TNavbarItem, TUserPaths } from '../types/NavberTypes';

export const sidebarItemsGenerator = (items: TUserPaths[], role: string) => {
  const navbarItems = items.reduce((acc: TNavbarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);

  return navbarItems;
};