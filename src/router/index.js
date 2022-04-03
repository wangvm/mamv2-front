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
    redirect:"/manage/project",
    children:[
      {
        path: "/manage/project",
        name: "project",
        component: () => import(/* webpackChunkName: "about" */ "@/views/project/project.vue"),
      },
      {
        path: "/manage/task",
        name: "task",
        component: () => import(/* webpackChunkName: "about" */ "@/views/project/task.vue"),
      }
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
