import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <div className=' h-[calc(100vh-64px)] bg-white dark:bg-gray-900'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
