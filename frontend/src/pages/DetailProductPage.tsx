import { useQuery } from "@tanstack/react-query";
import { getProductBySlugApi } from "../api/products";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { PlusIcon } from "../components/icons";
import { useCartStore } from "../store/cart";
import Reviews from "../components/Reviews";

const DetailProduct = () => {
  const { slug } = useParams();

  const addToCart = useCartStore(state => state.addToCart);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlugApi(slug || ""),
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error("Error!");

  return (
    <div className='bg-white dark:bg-gray-900'>
      <div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
        <div className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            {data.name}
          </h2>
          <p className='mb-1 font-bold'>${data.price}</p>
          <p className='mb-4 font-bold'>{data.description}</p>
          <button
            onClick={() => addToCart(data)}
            type='button'
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add to Cart
            <PlusIcon />
          </button>
        </div>

        <img
          className='w-full'
          src={`${import.meta.env.VITE_BACKEND_URL}${data.image}`}
          alt='office content 1'
        />
      </div>

      <Reviews productId={0} reviews={[]} />
    </div>
  );
};

export default DetailProduct;
