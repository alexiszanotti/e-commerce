import Rating from "./Rating";
import AddReview from "./AddReview";
import { useState } from "react";

interface Props {
  productId: number;
  reviews: [];
}

const Reviews = ({ productId, reviews }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && <AddReview productId={productId} setShow={setShow} />}
      <section className='bg-white dark:bg-gray-900'>
        <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
          <div className='mx-auto max-w-screen-sm'>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
              Reviews of this product
            </h2>
            <p className='mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400'>
              Explore the reivews of this product
            </p>
            <button
              onClick={() => setShow(true)}
              className='inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Create a review
            </button>
          </div>
        </div>
      </section>

      {reviews &&
        reviews.map((r: any) => (
          <article key={r.id} className='container mx-auto '>
            <div className='flex items-center mb-4 space-x-4'>
              <img
                className='w-10 h-10 rounded-full'
                src={`${import.meta.env.VITE_BACKEND_URL}${r.avatar}`}
                alt=''
              />
              <div className='space-y-1 font-medium dark:text-white'>
                <p>{r.user}</p>
              </div>
            </div>

            <Rating value={r.rating} />

            <footer className='mb-5 text-sm text-gray-500 dark:text-gray-400'>
              <p>{r.created_at.slice(0, 10)}</p>
            </footer>
            <p className='mb-2 text-gray-500 dark:text-gray-400'>{r.description}</p>
          </article>
        ))}
    </>
  );
};
export default Reviews;
