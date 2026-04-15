import api from "./axios.js";

export const getProducts = async (filters = {}) => {
  const res = await api.get("/product", { params: filters });
  return res.data;
};