import axios from "axios";
import VueRouter from "vue-router";
import { message } from "../assets/js/message";

// let baseUrl = 'http://mams.cuz.edu.cn/api'
let baseUrl = "http://localhost:8080";

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
    } else if (method === "PUT") {
      promise = $http.put(url, data, {
        headers: {
          'Content-Type': 'video/mp4'
        }
      });
    } else {
      promise = $http.post(baseUrl + url, data, { withCredentials: true });
    }
    promise
      .then((res) => {

        if (res.data === "") {
          resolve(res)
        } else {
          if (res.data.code === 200) {
            res.data.message !== "成功" ? message.success(res.data.message) : null;
          }
          else {
            message.error(res.data.message);
          }
          resolve(res.data);
        }
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
