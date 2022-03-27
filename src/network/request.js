import axios from "axios";
// import { Message } from 'element-ui'
// import { getUserToken } from "../config/storage"
import { message } from "../assets/js/message";

let baseUrl = "http://localserver:8080/mamv2";
// let baseUrl = 'http://121.196.100.229:8080/mam'

let $http = axios.create({
  headers: {},
  timeout: 5000,
  baseURL: baseUrl,
  crossDomain: true,
  withCredentials: true,
});

// 跨域配置cookie
axios.defaults.withCredentials = true;

//http request拦截器
$http.interceptors.request.use(
  (config) => {
    // const token = getUserToken()
    //debugger
    // if (token) {//判断是否存在token，如果存在则每个http header都加上token
    //   config.headers.token = token
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default function (url, data, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (method === "GET") {
      promise = $http.get(baseUrl + url, {
        params: data,
        withCredentials: true,
      });
    } else {
      promise = $http.post(baseUrl + url, data);
    }
    promise
      .then((res) => {
        res.data.code === 200 ? null : message.error(res.data.message);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
