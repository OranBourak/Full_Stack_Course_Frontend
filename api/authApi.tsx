import clientApi from "./ClientApi";
import { secureTokens, RemoveTokens } from "../utility/secureStorage";

export const authApi = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
  }) => {
    console.log("Attempting to register user:", data);
    try {
      const response = await clientApi.post("/auth/register", data);
      console.log("Registration successful:", response.data);
      return response;
    } catch (error: any) {
      console.log(
        "Registration failed:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
  login: async (data: { email: string; password: string }) => {
    console.log("Attempting to log in user:", data);
    try {
      const response = await clientApi.post("/auth/login", data);
      if (
        (response.data as { accessToken: string; refreshToken: string })
          .accessToken &&
        (response.data as { accessToken: string; refreshToken: string })
          .refreshToken
      ) {
        const responseData = response.data as {
          accessToken: string;
          refreshToken: string;
        };
        response.status = 200;
        await secureTokens(responseData.accessToken, responseData.refreshToken);
        clientApi.setHeader(
          "Authorization",
          `Bearer ${responseData.accessToken}`
        );
      }
      return response;
    } catch (error: any) {
      console.log(
        "Login failed:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
  logout: async (data: { refreshToken: string }) => {
    console.log("Attempting to log out user");
    try {
      const response = await clientApi.post("/auth/logout", data);
      await RemoveTokens();
      clientApi.deleteHeader("Authorization");
      return response;
    } catch (error: any) {
      console.log(
        "Logout failed:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
  // Function to upload an image
  uploadImage: async (body: FormData) => {
    return clientApi.post("/file/upload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
