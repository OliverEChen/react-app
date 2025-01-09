import {post, get} from '@/utils/http/request'
interface SearchUser {
    name: string,
    contact?: string,
    phone?: string,
    pageSize?: number,
    page?: number,
}
export function postUserList(data: SearchUser){
    return post('/userList', data)
}
export function postDeleteUser(id: number){
    return post('/deleteUser', {id})
}
export function batchDeleteUser(ids: string){
    return post('/deleteUser', {ids})
}