import { Link } from "react-router-dom";
import { Order } from "../Interfaces";
import { formatCurrency } from "../helper";

interface Props {
  orders: Order[];
}

const Orders = ({ orders }: Props) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-4 py-3'>
              Total price
            </th>
            <th scope='col' className='px-4 py-3'>
              Is delivered
            </th>
            <th scope='col' className='px-4 py-3'>
              Detail
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.length &&
            orders.map(({ total_price, is_delivered, id }) => (
              <tr key={id} className='border-b dark:border-gray-700'>
                <td
                  scope='row'
                  className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {formatCurrency(+total_price)}
                </td>
                <td className='px-4 py-3'>{is_delivered ? "Si" : "No"}</td>
                <td className='p-1 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-700 text-center'>
                  <Link to={`/order/${id}`}>Detail</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
