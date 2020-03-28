import axios from "axios";

const instance = axios.create({
  baseURL: "http://go.dynamic-form.com",
});

instance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
