import { $authHost, $host } from "./index";

const getCatalogs = async () => {
  const { data } = await $host.get(`/catalog/`);
  return data;
};

const createCatalog = async (formData) => {
  const { data } = await $host.post(`/catalog/`, formData);
  return data;
};

const getCatalogByUuid = async (uuid) => {
  const { data } = await $host.get(`/catalog/${uuid}`);
  return data;
};

const removeByUuid = async (uuid) => {
  const { data } = await $host.delete(`/catalog/${uuid}`);
  return data;
};

export { getCatalogs, getCatalogByUuid, removeByUuid, createCatalog };
