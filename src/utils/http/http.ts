import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from "axios";
import { message, notification } from "antd";
import {store} from "@/store";
const http:AxiosInstance = axios.create({
    baseURL: 'https://www.dev.com',
    timeout: 5000,
    headers: {}
})

http.interceptors.request.use((config:InternalAxiosRequestConfig) => {  
    const token = store.getState().authSlice.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
http.interceptors.response.use((response:AxiosResponse) => { 
    const res = response.data
    if(res.code !== 200){
        message.error(res.msg, 2)
        return Promise.reject(new Error(res.msg))
    }
    return res
 });

export default http;