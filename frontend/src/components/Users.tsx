import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi, getUsersApi } from "../api/users";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { User } from "../Interfaces";
import { useNavigate } from "react-router-dom";

interface Prop {
  users: [];
}

const Users = (user: Prop) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersApi,
  });

  console.log(data);

  const deleteUserMutation = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted!");
      navigate("/admin");
    },
    onError: error => {
      console.log(error);
      toast.error("Error!");
      navigate("/admin");
    },
  });

  if (isLoading || deleteUserMutation.isLoading) return <Loader />;
  if (isError) return toast.error("Error!");

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-4 py-3'>
              Id
            </th>
            <th scope='col' className='px-4 py-3'>
              Email
            </th>
            <th scope='col' className='px-4 py-3'>
              Name
            </th>
            <th scope='col' className='px-4 py-3'>
              Last name
            </th>
            <th scope='col' className='px-4 py-3 flex items-center justify-center gap-4'>
              Actions
            </th>
          </tr>
        </thead>

        {user && user.users?.length ? (
          <tbody>
            {user.users?.map(({ id, name, last_name, email }: User) => (
              <tr className='border-b dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {id}
                </th>
                <td className='px-4 py-3'>{email}</td>
                <td className='px-4 py-3'>{name}</td>
                <td className='px-4 py-3'>{last_name}</td>
                <td className='px-4 py-3 flex items-center justify-center gap-4'>
                  <BsFillTrashFill
                    onClick={() => deleteUserMutation.mutate(id)}
                    size={22}
                    className='text-red-300 cursor-pointer'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {data?.map(({ id, name, last_name, email }: User) => (
              <tr className='border-b dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {id}
                </th>
                <td className='px-4 py-3'>{email}</td>
                <td className='px-4 py-3'>{name}</td>
                <td className='px-4 py-3'>{last_name}</td>
                <td className='px-4 py-3 flex items-center justify-center gap-4'>
                  <BsFillTrashFill
                    onClick={() => deleteUserMutation.mutate(id)}
                    size={22}
                    className='text-red-300 cursor-pointer'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Users;
