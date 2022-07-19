import axios from 'axios'
import { getToken } from './auth';
const instance=axios.create({
    baseURL:'http://liufusong.top:8899/api/private/v1/',
    timeout:8000
})
export default instance

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization=getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });