import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { detailOrderApi } from "../api/orders";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { formatCurrency } from "../helper";

const OrderDetailPage = () => {
  const { id } = useParams();

  let newId: number;

  if (id) {
    newId = parseInt(id);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => detailOrderApi(newId),
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error("Error to get Order");

  return (
    <main className='flex flex-col gap-14 items-center container justify-center p-5'>
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
              Created at
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Delivered at
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b dark:border-gray-700'>
            <th
              scope='row'
              className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              {formatCurrency(+data.total_price)}
            </th>
            <td className='text-center px-4 py-3'>
              {data.is_delivered ? "Entregado" : "No entregado"}
            </td>
            <td className='text-center px-4 py-3'>{data.created_at.slice(0, 10)}</td>
            <td className='text-center px-4 py-3'>
              {data.delivered_at ? data.delivered_at.slice(0, 10) : "-"}
            </td>
            <td className='text-center px-4 py-3'>
              {data.shipping_address.city} - {data.shipping_address.address} (CP
              {data.shipping_address.postal_code})
            </td>
          </tr>
        </tbody>
      </table>

      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-4 py-3'>
              Product
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Price
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {data.order_items.map(({ product, price, quantity }: any) => (
            <tr key={crypto.randomUUID()} className='border-b dark:border-gray-700'>
              <th
                scope='row'
                className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {product}
              </th>
              <td className='text-center px-4 py-3'>{formatCurrency(+price)}</td>
              <td className='text-center px-4 py-3'>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default OrderDetailPage;
