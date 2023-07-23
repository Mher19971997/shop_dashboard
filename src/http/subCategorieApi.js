import { $authHost, $host } from "./index";

const getSubCategorie = async () => {
  const { data } = await $host.get(`/subCategorie/`);
  return data;
};

const createSubCategorie = async (inputDto) => {
  const { data } = await $host.post(`/subCategorie/`,inputDto);
  return data;
};

export { getSubCategorie, createSubCategorie };