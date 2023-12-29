import Rating from "./Rating";
import AddReview from "./AddReview";

interface Props {
  productId: number;
  reviews: [];
  addReview: boolean;
  setAddReview: (review: boolean) => void;
}

const Reviews = ({ productId, addReview, setAddReview, reviews }: Props) => {
  return (
    <div className='flex-1'>
      {addReview && <AddReview productId={productId} setShow={setAddReview} />}

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
                <p>{r.name || r.user}</p>
              </div>
            </div>

            <footer className='mb-3 text-sm flex gap-x-3 items-center text-gray-500 dark:text-gray-400'>
              <p>{r.created_at.slice(0, 10)}</p>
              <Rating value={r.rating} />
            </footer>
            <p className='mb-2 text-gray-800  dark:text-gray-400'>{r.description}</p>
            <div className=' my-2 bg-gray-400 h-px' />
          </article>
        ))}
    </div>
  );
};
export default Reviews;
