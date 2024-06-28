import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Page1 from "../views/Page1.vue";

const routes:any[] = [
    {
        path: "/",
        name: "home",
        component: HomePage,
      },
      {
        path: "/page-1",
        name: "Page1",
        component: Page1,
      },
]

const router = createRouter({
    history: createWebHistory(''),
    routes,
  });
  
  export default router;