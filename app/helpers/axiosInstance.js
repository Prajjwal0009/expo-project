//@ts-ignore
import Axios from "axios";
import { accessToken } from "./sessionKey";
import { toast } from "react-toastify";

const API_ROOT = "https://digitalsignage.dibsolutions.com.au/api/";

export default API_ROOT;
//create axios instance
export const instance = Axios.create({
  baseURL: `${API_ROOT}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${accessToken()}`,
  },
});
instance.interceptors.request.use(
  function (config) {
    config.headers = {
      "x-requested-with": "",
      authorization: `JWT ${accessToken()}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response } = error;
    if (response) {
      if (response.status === 404) {
        toast.error("Error");
      } else if (response.status === 401) {
        console.log("status", response);
        window.location.replace("/auth-login");
      } else {
        toast.error(response.data.msg);
      }
    }

    return Promise.reject(error);
  }
);

export const formDataInstance = Axios.create({
  baseURL: `${API_ROOT}`,
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers = {
      "x-requested-with": "",
      authorization: `JWT ${accessToken()}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response } = error;
    if (response) {
      if (response.status === 404) {
        toast.error("Error");
      } else if (response.status === 401) {
        console.log("status", response);
        window.location.replace("/login");
      } else {
        toast.error(response.data.msg);
      }
    }

    return Promise.reject(error);
  }
);

// create form data to upload files
export const postApiFormData = async (fileData) => {
  const { url, formData } = fileData;
  let response;
  try {
    response = await formDataInstance({
      method: "POST",
      url: `${url}`,
      headers: {
        Authorization: `JWT ${accessToken()}`,
      },
      data: formData,
      transformResponse: [
        function (responseData) {
          //Do what ever you want transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.response);
    return e.response;
  }
  return response;
};

//get data from api
export const getApiData = async (url, param = null) => {
  let response;
  try {
    response = await instance({
      method: "GET",
      url: `${url}`,
      params: param,
      transformResponse: [
        function (responseData) {
          // Do whatever you want to transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    return e.response;
  }
  return response;
};

export const downloadApiData = async (url, fileName) => {
  let response;
  try {
    response = await instance({
      method: "GET",
      url: url,
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  } catch (e) {
    return e.response;
  }
  return response;
};

//post data to api
export const postApiData = async (data) => {
  const { url, formData, setError } = data;
  let response;
  try {
    response = await instance({
      method: "POST",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `JWT ${accessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          //Do whatever you want to transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    for (const key in e.response?.data) {
      if (e.response?.data.hasOwnProperty(key)) {
        setError(key, { type: "custom", message: e.response?.data[key] });
      }
    }
    return e.response;
  }
  return response;
};

//update data
export const putApiData = async (data) => {
  const { url, formData, formikProps } = data;

  // eslint-disable-next-line no-console
  let response;
  try {
    response = await instance({
      method: "PUT",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `JWT ${accessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          //Do whatever you want to transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    formikProps.setErrors(e.response.data);
    return e.response;
  }
  return response;
};

//delete data
export const deleteApiData = async (data) => {
  const { url } = data;
  let response;
  response = await instance({
    method: "DELETE",
    url: url,
    // params: param,
    headers: {
      Authorization: `JWT ${accessToken()}`,
    },
  });
  return response;
};

//update data
export const patchApiData = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "PATCH",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `JWT ${accessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          //Do whatever you want to transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    return e.response;
  }
  return response;
};
export { API_ROOT };
