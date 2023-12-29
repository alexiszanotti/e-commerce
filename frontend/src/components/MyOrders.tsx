import { Link } from "react-router-dom";
import { formatCurrency } from "../helper";
import { useQuery } from "@tanstack/react-query";
import { myOrdersApi } from "../api/orders";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Order } from "../Interfaces";

const MyOrders = () => {
  const {
    data: orders,
    isError: ordersError,
    isLoading: ordersLoading,
  } = useQuery({
    queryFn: myOrdersApi,
    queryKey: ["orders"],
  });

  if (ordersError) return toast.error("Error to fetched orders");
  if (ordersLoading) return <Loader />;

  return (
    orders.length > 0 && (
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-4 py-3'>
                Total price
              </th>
              <th scope='col' className='px-4 py-3 text-center'>
                Is delivered
              </th>
              <th scope='col' className='px-4 py-3 text-center'>
                Detail
              </th>
            </tr>
          </thead>

          {orders.length &&
            orders.map(({ total_price, is_delivered, id }: Order) => (
              <tbody key={id}>
                <tr className='border-b dark:border-gray-700'>
                  <td
                    scope='row'
                    className=' text-center px-4 py-3 font-medium text-black  whitespace-nowrap dark:text-white'
                  >
                    {formatCurrency(+total_price)}
                  </td>
                  <td className='text-center px-4 py-3 text-black dark:text-white'>
                    {is_delivered ? "Si" : "No"}
                  </td>
                  <td className='text-center'>
                    <Link
                      className=' px-3 py-2 rounded-lg bg-slate-200 text-black hover:bg-slate-300  dark:bg-gray-900 cursor-pointer dark:text-white dark:hover:bg-gray-700 text-center'
                      to={`/order/${id}`}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    )
  );
};

export default MyOrders;
