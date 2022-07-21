import request from '@/utils/request'

export const getRoles=()=>{
    return request({
        method:'GET',
        url:'roles'
    })
}