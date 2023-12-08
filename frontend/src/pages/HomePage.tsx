/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getProductsApi } from "../api/products";
import { toast } from "react-hot-toast";
import { Product } from "../Interfaces";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const HomePage = () => {
  const { ref, inView } = useInView();

  const { data, isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["products"], getProductsApi, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getNextPageParam: (page: any) => page.meta.next,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <>{toast.error(error.message)}</>;

  return (
    <>
      {data?.pages.map((page: any) => (
        <div key={page.meta.next}>
          <div className='flex justify-center'>
            <div className='p-8 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-16'>
              {page.data?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {!isLoading && data?.pages.length === 0 && (
            <p className='text-xl text-slate-800 dark:text-slate-200'>No more results</p>
          )}
          {!isLoading &&
            data?.pages?.length !== undefined &&
            data.pages.length > 0 &&
            hasNextPage && (
              <div ref={ref}>{isLoading || isFetchingNextPage ? <Loader /> : null}</div>
            )}
        </div>
      ))}
    </>
  );
};

export default HomePage;
