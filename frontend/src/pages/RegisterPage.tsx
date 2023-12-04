import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { registerApi } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";

import Logo from "../assets/logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  const [registerFields, setRegisterFields] = useState({
    email: "",
    last_name: "",
    name: "",
    password: "",
    re_password: "",
  });

  const { email, name, last_name, password, re_password } = registerFields;

  const registerMutation = useMutation({
    mutationFn: () => registerApi(email, name, last_name, password),
    onSuccess: () => {
      toast.success("Registered successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("An error has occurred try again");
    },
  });

  const handlePasswordMatch = () => {
    if (password !== re_password) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== re_password) {
      toast.error("Passwords do not match");
    } else {
      registerMutation.mutate();
    }
  };

  if (registerMutation.isLoading) return <span>Loading...</span>;

  if (isAuth) return <Navigate to='/' />;

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[800px] lg:py-0'>
      <Link
        to='/'
        className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
      >
        <img className='w-8 h-8 mr-2' src={Logo} alt='logo' />
        <span>Shop Zone</span>
      </Link>
      <div className='w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Create a new account
          </h1>
          <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={({ target }) =>
                  setRegisterFields({ ...registerFields, email: target.value })
                }
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
              />
            </div>
            <div>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your name
              </label>
              <input
                type='name'
                name='name'
                value={name}
                onChange={({ target }) =>
                  setRegisterFields({ ...registerFields, name: target.value })
                }
                id='name'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name'
              />
            </div>
            <div>
              <label
                htmlFor='last_name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your last name
              </label>
              <input
                type='name'
                name='last_name'
                value={last_name}
                onChange={({ target }) =>
                  setRegisterFields({ ...registerFields, last_name: target.value })
                }
                id='last_name'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='last name'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                value={password}
                onChange={({ target }) =>
                  setRegisterFields({ ...registerFields, password: target.value })
                }
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div>
              <label
                htmlFor='re-password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Confirm Password
              </label>
              <input
                type='password'
                name='re-password'
                id='re-password'
                placeholder='••••••••'
                value={re_password}
                onChange={({ target }) =>
                  setRegisterFields({ ...registerFields, re_password: target.value })
                }
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            {handlePasswordMatch() ? (
              false
            ) : (
              <p className='text-sm font-medium text-red-500'>Passwords must match</p>
            )}
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Sign up
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Have an account?{" "}
              <Link
                to={"/login"}
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
