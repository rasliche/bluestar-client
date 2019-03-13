import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/news",
      name: "news",
      // route level code-splitting
      // this generates a separate chunk (news.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "news" */ "./views/News.vue")
    },
    {
      path: "/training",
      name: "training",
      // route level code-splitting
      // this generates a separate chunk (training.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "training" */ "./views/Training.vue")
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (admin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "admin" */ "./views/Admin.vue")
    },
  ]
});
