import axios from "axios";

export const hasUsableAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return false;
    const base64Payload = encodedPayload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(encodedPayload.length / 4) * 4, "=");
    const payload = JSON.parse(atob(base64Payload));
    // JWT expiry is expressed in seconds. Tokens without an expiry are left to
    // the server to validate, which keeps this compatible with existing auth.
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// A token can expire while it is stored in the browser (or after the server's
// signing key changes).  Remove it immediately so protected requests are not
// repeatedly made as though the user is still signed in.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth:expired"));
    }
    return Promise.reject(error);
  },
);

export default api;
