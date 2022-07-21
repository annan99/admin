import request from '@/utils/request'

export const getRights=(type)=>{
    return request({
        method:'GET',
        url:'rights/list',
        params:{
            type
        }
    })
}