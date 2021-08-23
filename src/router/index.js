import Vue from "vue";
import VueRouter from "vue-router";
import SpiderSolitaire from "@/views/SpiderSolitaire.vue";
import About from "@/views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "About",
    component: About,
  },
  {
    path: "/SpiderSolitaire",
    name: "SpiderSolitaire",
    component: SpiderSolitaire,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
