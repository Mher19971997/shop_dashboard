import { $authHost } from "./index";

const getUsers = async () => {
  const { data } = await $authHost.get(`/user/`);
  return data;
};

const updateUserById = async () => {
  const { data } = await $authHost.patch(`/auth/api/v1/user/:uuid`);
  return data;
};

const deleteUserById = async () => {
  const { data } = await $authHost.patch(`/auth/api/v1/user/:uuid`);
  return data;
};

const getProfile = async () => {
  const { data } = await $authHost.get(`/user/api/v1/user/me`);
  return data;
};

export { getUsers, getProfile, updateUserById, deleteUserById };
