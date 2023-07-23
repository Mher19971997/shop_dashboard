import { $host } from "http";

const verifyAndRegister = async (data) => {
  return await $host.post("/auth/verifyAndRegister", data);
};

const checkEmail = async (data) => {
  return await $host.post("/auth/checkEmail", data);
};

export { verifyAndRegister, checkEmail };
