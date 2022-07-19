import request from '@/utils/request'


/**
 * 登录界面
 * @param {*} param0 
 * @returns 
 */
export const login=({username,password})=>{
    return request({
        method:'POST',
        url:'login',
        data:{
            username,
            password
        }
    })
}