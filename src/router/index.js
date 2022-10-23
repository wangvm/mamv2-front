import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ "@/views/home.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/manage.vue"),
    redirect: "/manage/task",
    children: [
      {
        path: "/manage/task",
        name: "task",
        component: () => import(/* webpackChunkName: "about" */ "@/views/task/task.vue"),
      },
      {
        path: "/manage/file",
        name: "file",
        component: () => import(/* webpackChunkName: "about" */ "@/views/file/file.vue"),
      },
      {
        path: "/manage/user",
        name: "user",
        component: () => import(/* webpackChunkName: "about" */ "@/views/user/user.vue"),
      },
    ],
  },
  {
    path: "/catalog",
    name: "catalog",
    component: () => import(/* webpackChunkName: "about" */ "@/views/catalog.vue"),
    redirect: "/catalog/edit",
    children: [
      {
        path: "/catalog/edit",
        name: "editCatalog",
        component: () => import(/* webpackChunkName: "about" */ "@/views/catalog/catalog-edit.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
