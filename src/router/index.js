import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Join from "@/views/Join.vue";
import Login from "@/views/Login.vue";
import OrderForm from "@/components/OrderForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/join",
      name: "join",
      component: () => import("../views/Join.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue"),
    },
    {
      path: "/order",
      name: "Order",
      component: () => import("../components/OrderForm.vue"),
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/Orders.vue"),
    },
    {
      path: "/orders/:id",
      name: "OrderDetail",
      component: () => import("../views/OrderDetail.vue"),
    },
  ],
});

export default router;
