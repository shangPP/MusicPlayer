import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("../views/MusicDetail.vue"),
    },
  ],
});

export default router;
