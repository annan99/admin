import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} param0 
 * @returns 
 */
export const getUsers=({query,pagenum,pagesize})=>{
    return request({
        method:'GET',
        url:'users',
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}


/**
 * 根据id删除用户
 */
export const delUser=(id)=>{
    return request({
        method:'DELETE',
        url:`users/${id}`,
        params:{
            id
        }
    })
}

/**
 * 更改用户状态
 * @param {*} param0 
 * @returns 
 */
export const updateState=({uId,type})=>{
    return request({
        method:'PUT',
        url:`users/${uId}/state/${type}`,
        data:{
            uId,
            type
        }
    })
}