import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import { useSearchStore } from "../store/search";
import SearchResults from "../pages/SearchResults";
import useDebounce from "../hooks/useDeounce";

const Layout = () => {
  const { searchTerm } = useSearchStore(state => state);

  const searchTermiDebounce = useDebounce(searchTerm, 500);

  return (
    <div>
      <Toaster />
      <Header />
      <div className=' min-h-semi-full bg-white dark:bg-gray-900'>
        {searchTermiDebounce.length ? <SearchResults /> : <Outlet />}
      </div>
    </div>
  );
};

export default Layout;
