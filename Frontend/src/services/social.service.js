import api from "../api/axiosInstance";


// POST /api/like/create-like/:postId
export const toggleLike = (postId) =>
    api.post(`/like/create-like/${postId}`);


// POST /api/audience/follow/:targetid
export const followUser = (targetId) =>
    api.post(`/audience/follow/${targetId}`);

// DELETE /api/audience/unfollow/:targetid
export const unfollowUser = (targetId) =>
    api.delete(`/audience/unfollow/${targetId}`);

// GET /api/audience/status/:targetid
export const getFollowStatus = (targetId) =>
    api.get(`/audience/status/${targetId}`);