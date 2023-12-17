import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersApi, updateOrderApi } from "../api/orders";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helper";

interface Props {
  orders: any;
}

const Orders = ({ orders }: Props) => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersApi,
  });

  const updateOrderMutatio = useMutation({
    mutationFn: updateOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order delivered!");
    },
    onError: () => {
      toast.error("Error to update order");
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error("Error to get orders");

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              Order Id
            </th>
            <th scope='col' className='px-6 py-3'>
              Created at
            </th>
            <th scope='col' className='px-6 py-3'>
              Delivered at
            </th>
            <th scope='col' className='px-6 py-3'>
              User
            </th>
            <th scope='col' className='px-6 py-3'>
              Total price
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Products
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.length
            ? orders.map(
                ({ is_delivered, id, created_at, delivered_at, user, total_price }: any) => (
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 '>
                    <td className='w-4 p-4'>
                      <div className='flex items-center'>
                        <input
                          onChange={() => updateOrderMutatio.mutate(id)}
                          id='checkbox-table-search-1'
                          type='checkbox'
                          checked={is_delivered}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label htmlFor='checkbox-table-search-1' className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      {id}
                    </th>
                    <td className='px-6 py-4'>{created_at ? created_at.slice(0, 10) : "-"}</td>
                    <td className='px-6 py-4'>{delivered_at ? delivered_at.slice(0, 10) : "-"}</td>
                    <td className='px-6 py-4'>{user.toString()}</td>

                    <td className='px-6 py-4'> {formatCurrency(+total_price)}</td>

                    <td className='text-center'>
                      <Link
                        className=' p-3 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-700'
                        to={`/order/${id}`}
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                )
              )
            : data.map(({ is_delivered, id, created_at, delivered_at, user, total_price }: any) => (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 '>
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input
                        onChange={() => updateOrderMutatio.mutate(id)}
                        id='checkbox-table-search-1'
                        type='checkbox'
                        checked={is_delivered}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label htmlFor='checkbox-table-search-1' className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {id}
                  </th>
                  <td className='px-6 py-4'>{created_at ? created_at.slice(0, 10) : "-"}</td>
                  <td className='px-6 py-4'>{delivered_at ? delivered_at.slice(0, 10) : "-"}</td>
                  <td className='px-6 py-4'>{user.toString()}</td>

                  <td className='px-6 py-4'> {formatCurrency(+total_price)}</td>

                  <td className='text-center'>
                    <Link
                      className=' p-3 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-700'
                      to={`/order/${id}`}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
