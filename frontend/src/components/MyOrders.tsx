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

        <tbody>
          {orders.length &&
            orders.map(({ total_price, is_delivered, id }: Order) => (
              <tr key={id} className='border-b dark:border-gray-700'>
                <td
                  scope='row'
                  className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {formatCurrency(+total_price)}
                </td>
                <td className='text-center px-4 py-3'>{is_delivered ? "Si" : "No"}</td>
                <td className='p-1 w-36 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-700 text-center'>
                  <Link to={`/order/${id}`}>Detail</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
