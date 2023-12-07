import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

import Users from "../components/Users";
import Orders from "../components/Orders";
import Products from "../components/Products";
import { SearchIcon } from "../components/icons";

const AdminPage = () => {
  const [show, setShow] = useState(0);

  return (
    <section className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
      <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
        <div className='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
          <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
            <div className='w-full md:w-1/2'>
              <form className='flex items-center'>
                <label htmlFor='simple-search' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <SearchIcon />
                  </div>
                  <input
                    type='text'
                    id='simple-search'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Search'
                  />
                </div>
                {show === 0 && (
                  <Link
                    className='flex text-sm px-4 py-2 rounded-md  ml-4 w-56 items-center hover:bg-gray-700'
                    to='new'
                  >
                    <AiFillPlusCircle size={24} className=' text-gray-400 cursor-pointer' />
                    <span className='mx-3 text-gray-400 font-bold'>Add product</span>
                  </Link>
                )}
              </form>
            </div>
            <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
              <button
                onClick={() => setShow(0)}
                type='button'
                className='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              >
                Products
              </button>
              <button
                onClick={() => setShow(1)}
                type='button'
                className='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              >
                Orders
              </button>
              <button
                onClick={() => setShow(2)}
                type='button'
                className='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              >
                Users
              </button>
            </div>
          </div>
          {show === 0 && <Products />}
          {show === 1 && <Orders />}
          {show === 2 && <Users />}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
