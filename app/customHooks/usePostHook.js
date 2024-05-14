import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postApiData } from "../helpers/axiosInstance";

const usePostHook = (props) => {
  const { queryKey, navigateURL } = props;
  //  Getting cached data from queryClient
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading: isPostLoading,
    mutateAsync,
    isSuccess: isPostSuccess,
    data: postData,
    isError: isPostError,
  } = useMutation(postApiData, {
    onSuccess: async (data) => {
      if (data?.status === 201 || data?.status === 200) {
        toast.success(data?.data?.message ?? "Success");
        if (navigateURL) {
          navigate(navigateURL);
        }
      }
    },
    onError: (error) => {
      toast.error("Error");
    },

    onSettled: async () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  return {
    isPostLoading,
    mutateAsync,
    isPostSuccess,
    postData,
    isPostError,
  };
};

export default usePostHook;
