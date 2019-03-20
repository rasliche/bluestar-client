import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// lessons
import AboutFKNMS from "./views/lessons/AboutFKNMS.vue"
import TrainingHome from "./views/lessons/TrainingHome.vue"

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
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    // {
    //   path: "/operators",
    //   name: "operators",
    //   // route level code-splitting
    //   // this generates a separate chunk (operators.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "operators" */ "./views/Operators.vue")
    // },
    // {
    //   path: "/operators/:slug",
    //   name: "operator",
    //   // route level code-splitting
    //   // this generates a separate chunk (operator.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "operator" */ "./views/Operator.vue")
    // },
    // {
    //   path: "/news",
    //   name: "news",
    //   // route level code-splitting
    //   // this generates a separate chunk (news.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "news" */ "./views/News.vue")
    // },
    {
      path: "/training",
      // route level code-splitting
      // this generates a separate chunk (training.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "training" */ "./views/Training.vue"),
      children: [
        {
          path: '',
          name: "training",
          component: TrainingHome
        },
        {
          path: 'about-fknms',
          name: "about-fknms",
          component: AboutFKNMS
        },
        {
          path: "*",
          name: "four-oh-four",
          component: () => import(/* webpackChunkName: "fourohfour" */ "./views/404.vue")
        },
      ]
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
    {
      path: '/quiz/create',
      name: 'quizcreate',
      component: () => import(/* webpackChunkName: "quizcreate" */ "./views/quiz/CreateQuiz.vue")
    }
  ]
});
