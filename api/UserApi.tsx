import apiClient from "./ClientApi";


// Function to upload an image
const uploadImage = async (body: FormData) => {
    return apiClient.post('/file/file', body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


// Function to add a user
const addUser = async (userDetails:any) => {
  try {
    const response = await apiClient.post('/auth/register', userDetails);
    return response; 
  } catch (error) {
    console.error('Failed to add user:', error);
    return null; // Handle errors appropriately
  }
};


// Function to get all users
const getAllUsers = async () => {
    try {
      const response = await apiClient.get('/user');
      return response.data; // Accessing data directly
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return null; // Handle errors appropriately
    }
  };
  

// const getAllUsers = async () => {
//  return apiClient.get('/user')
// }

// const addUser = async (userJson: any) => {
//     return apiClient.post('/user', userJson)
// }
export default {
    getAllUsers,
    addUser,
    uploadImage
}