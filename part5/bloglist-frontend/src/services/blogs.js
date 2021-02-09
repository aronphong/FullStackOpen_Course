import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const likeblog = async (blogObject) => {
  const updatedBlog = {
    ...blogObject,
    likes: blogObject.likes + 1,
  };
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (blogObject) => {
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`);
  return response.data;
};

export default { getAll, addBlog, setToken, likeblog, deleteBlog };
