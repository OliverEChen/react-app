import http from "./http";
interface ApiResponse {
    code: number;
    data: any;
    message: string;
}
export function get(url: string, params?: object):Promise<ApiResponse>{
    return http.get(url, {params})
}
export function post(url: string, data?: any):Promise<ApiResponse>{
    return http.post(url, data)
}