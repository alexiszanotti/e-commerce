/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/products";
import { toast } from "react-hot-toast";
import { Product } from "../Interfaces";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useSearchStore } from "../store/search";
import useDebounce from "../hooks/useDeounce";
import SearchResults from "./SearchResultsPage";

const HomePage = () => {
  const { searchTerm } = useSearchStore(state => state);

  const searchTermiDebounce = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useQuery(["products"], getProductsApi);

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <>{toast.error(error.message)}</>;

  if (searchTermiDebounce) return <SearchResults />;

  return (
    <div>
      <div className='flex justify-center'>
        <div className='p-8 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-16'>
          {data?.data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
