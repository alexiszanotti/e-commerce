import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { Token } from "../Interfaces";
import { useAuthStore } from "../store/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById, updateUserApi } from "../api/users";
import toast from "react-hot-toast";
import { CloseIcon, UploadIcon } from "../components/icons";
import Loader from "../components/Loader";
import MyOrders from "../components/MyOrders";

const UserProfilePage = () => {
  const token: string = useAuthStore.getState().access;

  const { user_id }: Token = jwtDecode(token);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    avatar: "",
  });

  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Profile updated successfully");
      setShowEditProfile(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
      setShowEditProfile(false);
    },
  });

  const {
    data: userData,
    isError: userError,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: ["users", user_id],
    queryFn: () => getUserById(user_id),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editProfileMutation.mutate({
      name: formData.name,
      last_name: formData.last_name,
      avatar: image,
      id: user_id,
      email: userData.email,
      is_staff: userData.is_staff,
    });
  };

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsHovered(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setIsHovered(false);
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        name: userData.name,
        last_name: userData.last_name,
        avatar: userData.avatar,
      });
    }
  }, [userData]);

  if (userIsLoading) return <Loader />;
  if (userError) return <div>{toast.error("Error get user")}</div>;

  return (
    <section className='flex justify-center'>
      <div
        className={`${
          showEditProfile ? "p-4" : "py-4"
        } mt-8 min-w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        {!showEditProfile ? (
          <>
            <div className='flex flex-col items-center pb-3'>
              <img
                className='w-24 h-24 mb-3 rounded-full shadow-lg'
                src={`${import.meta.env.VITE_BACKEND_URL}${userData.avatar}`}
                alt={userData.name}
              />
              <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{`${userData.name} ${userData.last_name}`}</h5>
              <span className='text-sm text-gray-500 dark:text-gray-400'>{userData.email}</span>
              <div className='flex mt-4 md:mt-6'>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <MyOrders />
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={({ target }) => setFormData({ ...formData, name: target.value })}
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='John'
            />
            <label
              htmlFor='last_name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Last name
            </label>
            <input
              type='text'
              name='last_name'
              value={formData.last_name}
              onChange={({ target }) => setFormData({ ...formData, last_name: target.value })}
              id='last_name'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Do'
            />
            {image === null ? (
              <label
                htmlFor='dropzone-file'
                className={`flex flex-col items-center justify-center mt-3 w-full  border-2 border-gray-600 border-dashed rounded-lg 
            hover:cursor-pointer bg-gray-40 ${isHovered ? "bg-gray-600 " : "hover:bg-gray-600 "}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <UploadIcon />
                <div className='flex flex-col items-center justify-center '>
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    SVG, PNG, JPG or GIF (Max. 800x400px)
                  </p>
                </div>
                <input
                  ref={inputRef}
                  type='file'
                  id='dropzone-file'
                  onChange={handleFileChange}
                  className='opacity-0'
                />
              </label>
            ) : (
              <>
                <button
                  onClick={removeImage}
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-toggle='defaultModal'
                >
                  <CloseIcon />
                </button>
                <img
                  className='object-cover	 h-48 w-96'
                  src={filePreview || `${import.meta.env.VITE_BACKEND_URL}${formData.avatar}`}
                  alt='Imagen seleccionada'
                />
              </>
            )}

            <button
              className=' mt-3 w-full
                 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg
                hover:bg-blue-800 
                dark:bg-blue-600 
                dark:hover:bg-blue-700 '
            >
              Save changes
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default UserProfilePage;
