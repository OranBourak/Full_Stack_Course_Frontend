import PostApi from "../api/PostApi";

export type Post = {
    title: string;
    message: string;
    owner: string;
}

const data: Post[] = [
    { 
        title: 'John Doe',
        message: '123456 ',
        owner: "oran@gmail.com" 
    },
    
]

const getAllPosts = async () => {
    try{
        const posts = await PostApi.getAllPosts();
        return posts;
    }catch(error){
        console.log('Failed to get posts from server: ', error);
    }
}

const getPostById = () => {
    //TODO: Implement this function
}

const addPost = () => {
    //TODO: Implement this function
}

const deletePost = () => {
    //TODO: Implement this function
}

export default { getAllPosts, getPostById, addPost, deletePost};