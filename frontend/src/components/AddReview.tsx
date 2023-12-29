import { useState } from "react";
import { CloseIcon, PlusIcon } from "./icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewApi } from "../api/products";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

interface Props {
  productId: number;
  setShow: (value: boolean) => void;
}

const AddReview = ({ productId, setShow }: Props) => {
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    description: "",
    rating: 0,
  });

  const { description, rating } = formData;

  const queryClient = useQueryClient();

  const createReview = useMutation({
    mutationFn: () => createReviewApi(description, rating, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Review created");
      setShow(false);
    },
    onError: () => {
      toast.error("Error to create review!");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createReview.mutate();
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 '>
      <div className='absolute mt-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[700px] w-[600px] rounded-md'>
        <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
          <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
            <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                ProductCa Add Review
              </h3>
              <button
                onClick={() => setShow(false)}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='defaultModal'
              >
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Description
                  </label>
                  <input
                    value={description}
                    onChange={({ target }) =>
                      setFormData({ ...formData, description: target.value })
                    }
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Type here'
                  />
                </div>

                <div className='star-rating text-3xl text-center mt-8'>
                  {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                      <button
                        type='button'
                        key={index}
                        className={index <= ((rating && hover) || hover) ? "on" : "off"}
                        onClick={() => setFormData({ ...formData, rating: index })}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        <span>
                          {" "}
                          <FaStar />{" "}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type='submit'
                className='text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                <PlusIcon />
                Create Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
