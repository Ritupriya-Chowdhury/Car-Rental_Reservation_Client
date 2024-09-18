import { ReactNode } from "react";

export type TNavbarItem = {
  key: string;
  label: ReactNode;
  path?: string; 
  children?: TNavbarItem[]; 
};
  export type TRoute = {
    path: string;
    element: ReactNode;
  };

  export type TUserPaths ={
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPaths[];

  }
