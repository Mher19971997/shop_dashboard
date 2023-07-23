import { $authHost, $host } from "./index";

const createimage = async (formData) => {
  const { data } = await $authHost.post(`/images/`,formData);
  return data;
};

export { createimage };