import axios from "axios";

const $host = axios.create({
  baseURL: "http://localhost:3001/",
});

const $authHost = axios.create({
  baseURL: "http://localhost:3001/",
});

const authInterceptor = async (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};
const onResponseFail = (error) => {
  const status = error.status || error.response.status;
  if (status === 401 || (status === 400 && error.message === "jwt expired")) {
    localStorage.removeItem("token");
  }

  return Promise.reject(error);
};

$authHost.interceptors.request.use(authInterceptor, onResponseFail);

$authHost.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error, "errorerror");
    if (error.response.data.message == "jwt expired" && error.response.data.statusCode == 400) {
      localStorage.removeItem("token");
    }
  }
);

export { $host, $authHost };
