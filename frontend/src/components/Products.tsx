import { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { deleteProductApi, getProductsApi } from "../api/products";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useInView } from "react-intersection-observer";
import { Product } from "../Interfaces";

const Products = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted!");
      navigate("/admin");
    },
    onError: error => {
      console.log(error);
      toast.error("Error!");
      navigate("/admin");
    },
  });

  if (deleteProductMutation.isLoading) return <Loader />;
  if (isLoading) return <Loader />;
  if (error instanceof Error) return <>{toast.error(error.message)}</>;

  const handleDelete = (productId: number) => {
    deleteProductMutation.mutate(productId);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-4 py-3'>
              Id
            </th>
            <th scope='col' className='px-4 py-3'>
              Name
            </th>
            <th scope='col' className='px-4 py-3'>
              Price
            </th>
            <th scope='col' className='px-4 py-3'>
              Stock
            </th>
            <th scope='col' className='px-4 py-3 flex items-center justify-center'>
              Actions
            </th>
          </tr>
        </thead>

        {data?.pages.map((page: any) => (
          <tbody key={page}>
            {page.data?.map(({ id, name, price, count_in_stock }: Product) => (
              <tr key={id} className='border-b dark:border-gray-700'>
                <td className='px-4 py-3'>{id}</td>
                <td className='px-4 py-3'>{name || "-"}</td>
                <td className='px-4 py-3'> {price ? `$ ${price}` : "-"}</td>
                <td className='px-4 py-3'>{count_in_stock}</td>
                <td className='px-4 py-3'>
                  <div className='flex justify-center gap-4'>
                    <BsFillTrashFill
                      onClick={() => {
                        if (id) handleDelete(id);
                      }}
                      size={22}
                      className='text-red-300 cursor-pointer'
                    />

                    <Link to={`edit/${id}`}>
                      <AiFillEdit size={22} className='text-white cursor-pointer' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Products;
