import { Post } from "../Models/PostModel";
import clientApi from "./ClientApi";

export const postApi = {
  fetchPosts: async () => {
    return clientApi.get("/post");
  },
  createPost: async (post: Post) => {
    return clientApi.post("/post", post);
  },
  likePost: async (postId: string) => {
    return clientApi.put(`/post/like/${postId}`);
  },
  unlikePost: async (postId: string) => {
    return clientApi.put(`/post/unlike/${postId}`);
  },
  deletePost: async (postId: string) => {
    return clientApi.delete(`/post/${postId}`);
  },
  updatePost: async (
    postId: string,
    data: { message?: string; photo?: string }
  ) => {
    return clientApi.put(`/post/${postId}`, data);
  },
  getAllUserPosts: async (userId: string) => {
    return clientApi.get(`/post/user/${userId}`);
  },

  uploadImage: async (body: FormData) => {
    return clientApi.post("/file/postUpload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
