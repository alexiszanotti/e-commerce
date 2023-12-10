import { Link } from "react-router-dom";
import { Product } from "../Interfaces";
import { ArrowRightIcon } from "./icons";
import { useCartStore } from "../store/cart";
import Rating from "./Rating";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <Link to={`/product/${product.slug}`}>
          <img
            className='rounded-t-lg h-72 w-full object-cover'
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
            alt={product.name}
          />
        </Link>
        <div className='p-5 '>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {product.name}
          </h5>
          <div className='flex justify-between'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200'>
              € {product.price}
            </h5>
            <div className='flex items-center'>
              <span className='ml-1 text-gray-500 dark:text-gray-400'>
                {product.rating === null && <Rating value={product.rating} />}
              </span>
            </div>
          </div>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className='inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add to Cart
            <ArrowRightIcon />
          </button>

          <Link
            to={`/product/${product.slug}`}
            className='inline-flex items-center mx-3
        px-3 py-2 text-sm font-medium text-center text-white 
        bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 
        focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
        dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            View
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
