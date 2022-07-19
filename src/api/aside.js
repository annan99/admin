import request from '@/utils/request'

/**
 * 左侧菜单
 */

export const getMenuList=()=>{
    return request({
        method:'GET',
        url:'menus',
         
    })
}