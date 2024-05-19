import clientApi from "./ClientApi";

// Function to upload an image
const uploadImage = async (body: FormData) => {
  return clientApi.post("/file/upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateImage = async (body: FormData, userImageUri: string) => {
  const deleteResponse = await clientApi.delete(`/file/remove`, {
    data: { url: userImageUri },
  });
  console.log(
    "delete response (printed from updateImage function)",
    deleteResponse
  );
  if (deleteResponse.status === 200) {
    const updateResponse = await clientApi.post("/file/update", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return updateResponse;
  }
  return deleteResponse; // Return the delete response if delete was not successful
};

const userLogin = async (userDetails: any) => {
  try {
    const response = await clientApi.post("/auth/login", userDetails);
    return response;
  } catch (error) {
    console.error("Failed to login:", error);
    return null; // Handle errors appropriately
  }
};

// Function to add a user
const addUser = async (userDetails: any) => {
  try {
    const response = await clientApi.post("/auth/register", userDetails);
    return response;
  } catch (error) {
    console.error("Failed to add user:", error);
    return null; // Handle errors appropriately
  }
};

// Function to fetch user information by email
const getUserInfoByEmail = async (email: string) => {
  try {
    const response = await clientApi.get(`/user/email/${email}`);
    return response.data; // Return the user data
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null; // Handle errors appropriately
  }
};

const updateUser = async (userDetails: any) => {
  try {
    const response = await clientApi.put(
      `/user/${userDetails.email}`,
      userDetails
    );
    return response;
  } catch (error) {
    console.error("Failed to update user:", error);
    return null; // Handle errors appropriately
  }
};

const getLoggedInUserId = async () => {
  try {
    const response = await clientApi.get("/user/myId");
    return (response.data as any).userId;
  } catch (error) {
    console.error("Failed to get logged in user ID:", error);
    return null; // Handle errors appropriately
  }
};

const unFollowUser = async (userId: string) => {
  try {
    const response = await clientApi.put(`/user/unfollow/${userId}`);
    return response;
  } catch (error) {
    console.error("Failed to unfollow user:", error);
    return null; // Handle errors appropriately
  }
};
const followUser = async (userId: string) => {
  try {
    const response = await clientApi.put(`/user/follow/${userId}`);
    return response;
  } catch (error) {
    console.error("Failed to follow user:", error);
    return null; // Handle errors appropriately
  }
};

const getUserInfoById = async (userId: string) => {
  try {
    const response = await clientApi.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
    return null; // Handle errors appropriately
  }
};

const getFollowedUserIds = async () => {
  try {
    const response = await clientApi.get("/user/following");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch followed users:", error);
    return null; // Handle errors appropriately
  }
};

export default {
  addUser,
  uploadImage,
  userLogin,
  getUserInfoByEmail,
  updateUser,
  updateImage,
  getLoggedInUserId,
  unFollowUser,
  followUser,
  getUserInfoById,
  getFollowedUserIds,
};
