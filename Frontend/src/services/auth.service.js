import api from "../api/axiosInstance";

// POST /api/user/register
export const register = (data) =>
    api.post("/user/register", data);

// POST /api/user/login
export const login = (data) =>
    api.post("/user/login", data);

// DELETE /api/user/logout
export const logout = () =>
    api.delete("/user/logout");