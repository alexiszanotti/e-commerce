import { useQuery } from "@tanstack/react-query";
import { searchProductApi } from "../api/products";
import { useSearchStore } from "../store/search";
import ProductCard from "../components/ProductCard";
import { Product } from "../Interfaces";
import useDebounce from "../hooks/useDeounce";

const SearchResults = () => {
  const { searchTerm } = useSearchStore(state => state);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data } = useQuery({
    queryKey: ["products", debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm) return searchProductApi(debouncedSearchTerm);
      return { products: [] };
    },
  });

  if (!data) return null;
  return (
    <div className='flex justify-center w-full'>
      <section
        className={`p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16`}
      >
        {data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default SearchResults;
