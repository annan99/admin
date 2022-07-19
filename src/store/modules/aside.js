import {getMenuList} from '@/api/aside'
import { setToken,getToken } from '@/utils/auth'
const state={
    token:getToken
}
const mutations={
    setToken(state,payload){
        state.token=payload
    }
}
const actions={}
export default{
    namespaced:true,
    state,
    mutations,
    actions
  }