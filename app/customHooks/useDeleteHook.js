import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApiData } from "../helpers/axiosInstance";
import { toast } from "react-toastify";

const useDeleteHook = (props) => {
  const { queryKey } = props;
  //  Getting cached data from queryClient
  const queryClient = useQueryClient();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { isLoading, mutateAsync, isSuccess, data, isError } = useMutation(
    deleteApiData,
    {
      onSuccess: (data) => {
        toast.success("Item deleted successfully");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.detail ?? "Something went wrong");
      },
      onSettled: () => {
        //  When the mutation succeeds, invalidate or re-render queries with provided queryKey
        //  (or re-render particular component)
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
  return {
    isLoading,
    mutateAsync,
    isSuccess,
    data,
    isError,
    confirmDialog,
    setConfirmDialog,
  };
};

export default useDeleteHook;
