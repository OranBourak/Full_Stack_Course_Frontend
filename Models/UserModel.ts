import * as FileSystem from "expo-file-system";
import UserApi from "../api/UserApi";

export type User = {
  name: string;
  email: string;
  password: string;
  imgUrl: string;
};

export type UserInfo = {
  name?: string;
  email?: string;
  imgUrl?: string;
  postCount?: number;
  bio?: string;
  followers?: string[];
  following?: string[];
};

const addUser = async (user: User) => {
  const data = {
    name: user.name,
    email: user.email,
    password: user.password,
    imgUrl: user.imgUrl,
  };

  try {
    console.log("Adding user to server: ", data);
    const res = await UserApi.addUser(data);
    console.log("Response from server: ");
    console.log("Status code:", res?.status); // Add null check before accessing 'status' property
    console.log("Response data:", res?.data); // Add null check before accessing 'data' property
    return res;
  } catch (error) {
    console.log("Failed to add user to server: ", error);
  }
};

const deleteUser = (email: string) => {
  //TODO: Implement this function
};

const getUserInfoByEmail = async (email: string) => {
  try {
    const response = await UserApi.getUserInfoByEmail(email);
    return response;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

const updateUser = async (user: UserInfo) => {
  try {
    const response = await UserApi.updateUser(user);
    return response;
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

const uploadImage = async (imageURI: string) => {
  const body = new FormData();

  // Add the image to formData
  body.append("file", {
    uri: imageURI,
    name: "avatar.jpg",
    type: "image/jpeg", // Make sure this matches the type of image you're uploading
  } as any);

  // Send the formData using the UserApi's uploadImage function
  try {
    const response = await UserApi.uploadImage(body);
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

const updateUserImage = async (newImageURI: string, userImageUri: string) => {
  try {
    const body = new FormData();
    body.append("file", {
      uri: newImageURI,
      name: "avatar.jpg",
      type: "image/jpeg", // Make sure this matches the type of image you're uploading
    } as any);

    const response = await UserApi.updateImage(body, userImageUri);
    return (response.data as { url: string }).url;
  } catch (error) {
    console.error("Failed to update user image:", error);
  }
};

export default {
  addUser,
  deleteUser,
  uploadImage,
  getUserInfoByEmail,
  updateUser,
  updateUserImage,
};
