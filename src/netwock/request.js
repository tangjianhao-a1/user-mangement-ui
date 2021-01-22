import axios from "axios";
const request = axios.create({
  //服务器地址
  baseURL: "http://81.68.177.149:8080",
});

//拦截器设置
request.interceptors.response.use(
  response => response.data,
  error => {
    alert("请求出错");
    throw error
  }
);

export default request;