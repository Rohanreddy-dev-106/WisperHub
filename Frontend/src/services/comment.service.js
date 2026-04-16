import api from "../api/axiosInstance";

// POST /api/comment/create-comment
export const createComment = (data) =>
  api.post("/comment/create-comment", data);

// GET /api/comment/read-comment/:postId
export const getComments = (postId) =>
  api.get(`/comment/read-comment/${postId}`);

// DELETE /api/comment/delete-comment/:id
export const deleteComment = (commentId) =>
  api.delete(`/comment/delete-comment/${commentId}`);