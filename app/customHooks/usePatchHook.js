import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { patchApiData } from "../helpers/axiosInstance";

const usePatchHook = (props) => {
  const { queryKey, navigateURL }=props
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutateAsync, isSuccess, data, isError } = useMutation(
    patchApiData,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          console.log(data, "data");
          toast.success("Updated successfully");
          if (navigateURL) {
            navigate(navigateURL);
          }
        } else {
          toast.error(data?.data?.detail ?? "Something went wrong");

        }
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.detail ?? "Something went wrong");

      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey ?? null);
      },
    }
  );
  return {
    isLoading,
    mutateAsync,
    isSuccess,
    data,
    isError,
  };
};

export default usePatchHook;
