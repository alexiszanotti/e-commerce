import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlugApi } from "../api/products";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cart";
import Reviews from "../components/Reviews";
import { formatCurrency } from "../helper";

const DetailProduct = () => {
  const [addReview, setAddReview] = useState(false);

  const { slug } = useParams();

  const addToCart = useCartStore(state => state.addToCart);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlugApi(slug || ""),
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error("Error!");

  return (
    <section className=' p-10  flex w-full dark:bg-gray-900'>
      <div className='flex-1 flex gap-10'>
        <img
          className='size-48'
          src={`${import.meta.env.VITE_BACKEND_URL}${data.image}`}
          alt={data.name}
        />
        <div>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            {data.name}
          </h2>
          <p className='mb-1  text-gray-800 sm:text-lg dark:text-gray-400 font-bold'>
            {formatCurrency(+data.price)}
          </p>
          <p className='mb-4 text-gray-700'>{data.description}</p>
          <button
            onClick={() => addToCart(data)}
            type='button'
            className=' inline-flex mr-4 mb-5 items-center  gap-7 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add to cart
          </button>

          <button
            onClick={() => setAddReview(true)}
            className='inline-flex items-center  gap-7 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Create a review
          </button>
        </div>
      </div>

      <Reviews
        addReview={addReview}
        setAddReview={setAddReview}
        productId={data.id}
        reviews={data.reviews}
      />
    </section>
  );
};

export default DetailProduct;
