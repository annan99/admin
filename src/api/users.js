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


/**
 * 添加用户
 * @param {*} param0 
 * @returns 
 */
export const addUsers=({username,password,email,mobile})=>{
    return request({
        method:'POST',
        url:'users',
        data:{
            username,
            password,
            email,
            mobile
        }
    })
}

/**
 * 根据id查询用户信息
 * @param {*} id 
 * @returns 
 */
export const getUsersInfo=(id)=>{
    return request({
        method:'GET',
        url:`users/${id}`,
        params:{
            id
        }
    })
}

/**
 * 编辑用户信息
 * @param {*} param0 
 * @returns 
 */
export const editUsers=({id,email,mobile})=>{
    return request({
        method:'PUT',
        url:`users/${id}`,
        data:{id,email,mobile}
    })
}


/**
 * 获取分配列表
 * @param {} param0 
 * @returns 
 */
export const getRoles=()=>{
    return request({
        method:'GET',
        url:'roles'
    })
}

/**
 * 分配新角色
 * @param {用户id  角色id} param0 
 * @returns 
 */
export const putRoles=({id,rid})=>{
    return request({
        method:'PUT',
        url:`users/${id}/role`,
        data:{
            id,
            rid
        }
    })
}