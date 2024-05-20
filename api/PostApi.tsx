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
  updatePost: async (post: Post) => {
    return clientApi.put(`/post/${post._id}`, post);
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
  removePostImage: async (imageURL: string) => {
    console.log("Removing image:", imageURL);
    return clientApi.put(`/file/postImageRemove`, {
      data: { url: imageURL },
    });
  },
};
