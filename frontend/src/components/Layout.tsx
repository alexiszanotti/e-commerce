import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className=' min-h-semi-full bg-gray-200 dark:bg-gray-900'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
