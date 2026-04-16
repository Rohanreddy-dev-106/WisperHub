import api from "../api/axiosInstance";

// GET /api/post/get/:userId
export const getPostsByUser = (userId) =>
  api.get(`/post/get/${userId}`);

// GET /api/post/get-all — returns { success, posts }
export const getAllPosts = () => api.get(`/post/get-all`);

// GET /api/post/get-single/:postId — returns { success, post }
export const getPostById = (postId) => api.get(`/post/get-single/${postId}`);

// POST /api/post/create
export const createPost = (data) =>
  api.post("/post/create", data);

// PUT /api/post/update/:postId
export const updatePost = (postId, data) =>
  api.put(`/post/update/${postId}`, data);

// DELETE /api/post/delete/:postId
export const deletePost = (postId) =>
  api.delete(`/post/delete/${postId}`);