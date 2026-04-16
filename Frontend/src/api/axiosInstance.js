import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4506/api", 
  withCredentials: true,
});

// Response interceptor – handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("wh_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;