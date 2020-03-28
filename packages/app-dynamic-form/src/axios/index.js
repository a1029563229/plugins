import axios from "axios";
import { message } from "antd";

const instance = axios.create({
  baseURL: localStorage.getItem("baseURL") || "http://go.dynamic-form.com"
});

instance.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.code !== 0) {
      message.error(data.message);
      return Promise.reject(data.message);
    }

    return data;
  },
  function(error) {
    console.log({ error });
    return Promise.reject(error);
  }
);

export default instance;
