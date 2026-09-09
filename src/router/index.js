import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Jobs from "../views/Jobs.vue";
import Companies from "../views/Companies.vue";
import Dashboard from "../views/Dashboard.vue";
import Saved from "../views/Saved.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs
  },
  {
    path: "/companies",
    name: "Companies",
    component: Companies
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/saved",
    name: "Saved",
    component: Saved
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;