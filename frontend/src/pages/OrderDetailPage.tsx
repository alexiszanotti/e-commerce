import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { detailOrderApi } from "../api/orders";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const OrderDetailPage = () => {
  const { id } = useParams();

  let newId: number;

  if (id) {
    newId = parseInt(id);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => detailOrderApi(newId),
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error("Error to get Order");

  return <div>OrderDetailPage {id}</div>;
};

export default OrderDetailPage;
