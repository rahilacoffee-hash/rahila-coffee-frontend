// cartApi.js
import api from "./axios"; // your axios instance

// Add product to cart
export const addToCart = async (productId, quantity) => {
  try {
    const { data } = await api.post("/cart", { productId, quantity });
    return data;
  } catch (error) {
    console.error("Add to cart failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get cart items
export const getCart = async () => {
  try {
    const { data } = await api.get("/cart");
    return data;
  } catch (error) {
    console.error("Get cart failed:", error.response?.data || error.message);
    throw error;
  }
};

