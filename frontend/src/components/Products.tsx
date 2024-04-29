import { useNavigate } from "react-router-dom";
import { deleteProductApi, getProductsApi } from "../api/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Product } from "../Interfaces";
import TableBodyProducts from "./TableBodyProducts";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(["products"], getProductsApi);

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
        <thead className='text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400'>
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

        {products?.length > 0 ? (
          <tbody>
            {products?.map((product: Product) => (
              <TableBodyProducts key={product.id} handleDelete={handleDelete} product={product} />
            ))}
          </tbody>
        ) : (
          <>
            {data?.pages.map((page: any) => (
              <tbody key={page}>
                {page.data?.map((product: Product) => (
                  <TableBodyProducts
                    key={product.id}
                    handleDelete={handleDelete}
                    product={product}
                  />
                ))}
              </tbody>
            ))}
          </>
        )}
      </table>
    </div>
  );
};

export default Products;
