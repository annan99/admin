// import { login } from "@/api/user";
import router from "@/router";
import { getToken, setToken, removeToken } from "@/utils/auth";
const state = {
  token: getToken() || "",
};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
    setToken(payload);
  },
  layout() {
    removeToken();
    router.push("/login");
  },
};
const actions = {
   remove(context) {
    context.commit("layout");
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
