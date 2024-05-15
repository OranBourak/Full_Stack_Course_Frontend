import { create } from "apisauce";
const clientApi = create({
  baseURL: "http://192.168.7.32:3000",
  headers: { Accept: "application/vnd.github.v3+json" },
});

export default clientApi;
