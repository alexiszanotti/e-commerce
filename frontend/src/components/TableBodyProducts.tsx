import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

type Props = {
  product: any;
  handleDelete: (id: number) => void;
};

const TableBodyProducts = ({ handleDelete, product }: Props) => {
  return (
    <tr key={product.id} className='border-b dark:border-gray-700'>
      <td className='px-4 py-3'>{product.id}</td>
      <td className='px-4 py-3'>{product.name || "-"}</td>
      <td className='px-4 py-3'> {product.price ? `$ ${product.price}` : "-"}</td>
      <td className='px-4 py-3'>{product.count_in_stock}</td>
      <td className='px-4 py-3'>
        <div className='flex justify-center gap-4'>
          <BsFillTrashFill
            onClick={() => {
              if (product.id) handleDelete(product.id);
            }}
            size={22}
            className='text-red-300 cursor-pointer'
          />

          <Link to={`edit/${product.id}`}>
            <AiFillEdit size={22} className='text-white cursor-pointer' />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default TableBodyProducts;
