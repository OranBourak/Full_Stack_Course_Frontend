import { postApi } from "../api/PostApi";

export type Post = {
  _id?: string;
  title: string;
  message: string;
  owner: string;
  likes?: string[];
  photo?: string;
  updatedAt?: Date;
};

const getAllPosts = async () => {
  try {
    const posts = await postApi.fetchPosts();
    return posts;
  } catch (error) {
    console.log("Failed to get posts from server: ", error);
  }
};

const uploadPostImage = async (imageURI: string) => {
  const body = new FormData();

  // Add the image to formData
  body.append("file", {
    uri: imageURI,
    name: "postImage.jpg",
    type: "image/jpeg", // Make sure this matches the type of image you're uploading
  } as any);

  // Send the formData using the UserApi's uploadImage function
  try {
    const response = await postApi.uploadImage(body);
    if (response.ok && response.data) {
      console.log("Image uploaded successfully:", response.data);
      return (response.data as { url: string }).url; // Assuming the backend responds with the URL in this format
    } else {
      console.error("Upload failed:", response.problem);
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

const addPost = async (post: Post) => {
  try {
    if (post.photo && post.photo !== "") {
      const newfilename = await uploadPostImage(post.photo);
      post.photo = newfilename || ""; // Provide a default value for post.photo in case newfilename is undefined
    }
    const response = await postApi.createPost(post);
    return response;
  } catch (error) {
    console.error("Failed to add post:", error);
  }
};

const updatePost = async (postId: string, post: Post) => {
  if (post.photo) {
    const newfilename = await uploadPostImage(post.photo);
    post.photo = newfilename || ""; // Provide a default value for post.photo in case newfilename is undefined
  }
  const response = await postApi.updatePost(postId, post);
  return response;
};

export default { getAllPosts, addPost, updatePost };
