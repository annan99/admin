import { getToken } from "@/utils/auth";
import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../components/Welcome.vue";
import Users from "../components/Users";
import Roles from "../components/Roles";
import Orders from "../components/Orders";
import Rights from "../components/Rights";
import Reports from "../components/Reports";
import Categories from "../components/Categories";
import Goods from "../components/Goods";
import Params from "../components/Params";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import("@/views/Login") },
  {
    path: "/home",
    component: () => import("@/views/Home"),
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome },
      { path: "/users", component: Users },
      { path: "/roles", component: Roles },
      { path: "/orders", component: Orders },
      { path: "/rights", component: Rights },
      { path: "/reports", component: Reports },
      { path: "/categories", component: Categories },
      { path: "/goods", component: Goods },
      { path: "/params", component: Params },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 前置路由导航守卫
// router.beforeEach((to, from, next) => {
//   // if (to.path === "/login") {
//   //   next();
//   // } else {
//   //   next("/login");
//   // }
//   // const token = getToken();
//   // if (!token) {
//   //   next("/login");
//   // } else {
//   //   next();
//   // }

// });

// const whiteList = ["/login"];
// router.beforeEach((to, from, next) => {
//   const token = getToken();
//   if (token) {
//     // 如果登陆过就不能再登录，直接去后台首页
//     if (to.path === "/login") {
//       next("/");
//     } else {
//       next();
//     }
//   } else {
//     if (whiteList.includes(to.path)) {
//       next();
//     } else {
//       next("/login");
//     }
//   }
// });
export default router;
