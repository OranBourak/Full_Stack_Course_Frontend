import * as FileSystem from 'expo-file-system';
import UserApi from "../api/UserApi";


export type User = {
    email: string;
    password: string;
    imgUrl: string;
}

const data: User[] = [
    { 
        email: 'John Doe',
        password: '123456 ',
        imgUrl: "../assets/Avatar.jpg" 
    },
    
]

// const uploadImage = async (imageURI: string) => {
//     const body = new FormData();
//     // body.append('file',imageURI);
//     body.append('file', {name: 'name',type: 'image/jpeg',uri: imageURI});

//     try {
//         const res = await UserApi.uploadImage(body);
//         if(!res.ok){
//             console.log("save failed " + res.problem)
//         }else{
//             if(res.data){
//                 const data:any = res.data;
//                 console.log("save success " + res.data)
//                 return data.url;
//             }
//         }
//     } catch (error) {
//         console.log('Failed to upload image to server: ', error);
//     }

//     return "";        
// }
const uploadImage = async (imageURI: string) => {    
    const body = new FormData();

    // Add the image to formData
    body.append('file', {
        uri: imageURI,
        name: 'avatar.jpg', 
        type: 'image/jpeg', // Make sure this matches the type of image you're uploading
    } as any);

    // Send the formData using the UserApi's uploadImage function
    try {
        const response = await UserApi.uploadImage(body);
        if (response.ok && response.data) {
            console.log('Image uploaded successfully:', response.data);
            return (response.data as { url: string }).url; // Assuming the backend responds with the URL in this format
        } else {
            console.error('Upload failed:', response.problem);
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};





const getAllUsers = async () => {
    console.log("getAllUsers" )
    try{
        const res:any = await UserApi.getAllUsers();
   
        let users = Array<User>();
        if(res.data){
            res.data.forEach((obj:any) => {
                console.log("element: " + obj.email)
                const user: User = {
                    email: obj.email,
                    password: obj.password,
                    imgUrl: obj.imgUrl
                }
                users.push(user);
            });
        }
        
        return users;
    }catch(error){
        console.log('Failed to get users from server: ', error);
    }   
}


const getUserById = (email: string): User | undefined => {
    //TODO: Implement this function
    return data.find(user => user.email === email);
}


const addUser = async (user: User) => {
    const data = {
        email: user.email,
        password: user.password,
        imgUrl: user.imgUrl
    }

    try {
        console.log('Adding user to server: ', data);
        const res = await UserApi.addUser(data);
        console.log('Response from server: ');
        console.log('Status code:', res?.status); // Add null check before accessing 'status' property
        console.log('Response data:', res?.data); // Add null check before accessing 'data' property

    } catch (error) {
        console.log('Failed to add user to server: ', error);        
    }
}

const deleteUser = (email: string) => {
    //TODO: Implement this function
    const index = data.findIndex(user => user.email === email);
    if(index >= 0){
        data.splice(index, 1);
    }
}
    
export default { getAllUsers, getUserById, addUser, deleteUser, uploadImage};