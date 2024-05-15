import clientApi from "./ClientApi";

const getAllPosts = async () => {
  return clientApi.get("/post");
};
export default {
  getAllPosts,
};
