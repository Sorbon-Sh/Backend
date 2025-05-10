import type { ReactNode } from "react";

import AuthPage from "./AuthPage";


const PrivateRoute = ({ children }: { children: ReactNode}) => {
    const token = localStorage.getItem('token');
    return token ? children : <AuthPage />;
  };
  
  export default PrivateRoute