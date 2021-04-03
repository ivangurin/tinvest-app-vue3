import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/Home.vue")
  },
  {
    name: "settings",
    path: "/settings",
    component: () => import("@/views/Settings.vue")
  },
  {
    name: "positions",
    path: "/positions",
    component: () => import("@/views/Positions.vue")
  },
  {
    name: "profit",
    path: "/profit",
    component: () => import("@/views/Profit.vue")
  },
  {
    name: "operations",
    path: "/operations/:ticker",
    component: () => import("@/views/Operations.vue")
  }
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/tinvest/app/" : "/"
  ),
  routes: routes
});

export default router;
