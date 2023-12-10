import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { DecreaseQuantityIcon, IncrementQuantityIcon } from "../components/icons";
import { formatCurrency } from "../helper";
import { useCartStore } from "../store/cart";
import { createOrderApi } from "../api/orders";

const CartPage = () => {
  const { removeFromCart, removeAll, addToCart, cart, totalPrice } = useCartStore(state => state);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  const { address, city, postalCode } = formData;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      removeAll();
      toast.success("Order created successfully");
      navigate("/");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error to submited data");
      navigate("/");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrderMutation.mutate({
      address,
      city,
      postal_code: postalCode,
      total_price: totalPrice,
      order_items: cart,
    });
  };

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
          <div className='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
            <div className='relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
              <div className='flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4'>
                <div className='flex items-center flex-1 space-x-4'>
                  <h5>
                    <span className='text-gray-300 text-xl font-bold'>
                      Products in you cart: {cart.length}
                    </span>
                  </h5>
                  <h5>
                    <span className='text-gray-300 text-xl font-bold'>
                      Total: {totalPrice ? formatCurrency(totalPrice) : "0"}
                    </span>
                  </h5>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' className='px-4 py-3'>
                        Product
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Category
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Quantity
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Price
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(product => (
                      <tr
                        key={product.id}
                        className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        <th
                          scope='row'
                          className='flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
                            alt={product.name}
                            className='w-auto h-8 mr-3'
                          />

                          {product.name}
                        </th>
                        <td className='px-4 py-2'>
                          <span className='bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300'>
                            {product.category}
                          </span>
                        </td>
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          <div className='flex items-center space-x-3'>
                            <button
                              onClick={() => removeFromCart(product)}
                              className='inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                              type='button'
                            >
                              <DecreaseQuantityIcon />
                            </button>
                            <div>
                              {product.quantity}
                              <input
                                type='number'
                                id='first_product'
                                className='hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='1'
                                required
                              />
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className='inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                              type='button'
                            >
                              <IncrementQuantityIcon />
                            </button>
                          </div>
                        </td>
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          €{formatCurrency(product.price)}
                        </td>

                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          {product.quantity
                            ? formatCurrency(product.price * product.quantity)
                            : formatCurrency(product.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {cart.length > 0 && (
            <div className='m-auto w-1/2 p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Complete your order
              </h1>
              <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                <div>
                  <label
                    htmlFor='city'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    City
                  </label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Valencia'
                    value={city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='address'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    placeholder='Av. Boulevard...'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='postlaCode'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Postal code
                  </label>
                  <input
                    type='text'
                    name='postalCode'
                    id='postalCode'
                    placeholder='46007'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={postalCode}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  disabled={!address || !city || !postalCode}
                >
                  Create order
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;
