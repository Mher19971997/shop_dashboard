import { $authHost, $host } from "./index";

const getCategories = async () => {
  const { data } = await $host.get(`/categorie/`);
  return data;
};

const createCategories = async (inputDto) => {
  const { data } = await $host.post(`/categorie/`, inputDto);
  return data;
};

export { getCategories, createCategories };