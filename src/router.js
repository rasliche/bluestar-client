import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import store from "./store/index";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register-admin",
      name: "register-admin",
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register-admin" */ "./views/RegisterAdmin.vue")
    },
    {
      path: "/me",
      name: "me",
      beforeEnter(to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next();
        } else {
          // store.dispatch('alert/setAlert', {
          //   type: "error",
          //   text: "You must be logged in to visit that page!"
          // })
          next("login");
        }
      },
      component: () =>
        import(/* webpackChunkName: 'me' */ "./views/Me.vue")
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    // {
    //   path: "/operators",
    //   name: "operators",
    //   // beforeEnter (to, from, next) {
    //   //   if (store.state.token) {
    //   //     next()
    //   //   } else {
    //   //     next('/login')
    //   //   }
    //   // },
    //   component: () => import(/* webpackChunkName: "operators" */ "./views/Operators.vue")
    // },
    {
      path: "/operators/:slug",
      name: "operator",
    //   // beforeEnter (to, from, next) {
    //   //   if (store.state.token) {
    //   //     next()
    //   //   } else {
    //   //     next('/login')
    //   //   }
    //   // },
    // route level code-splitting
    // this generates a separate chunk (operator.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "operator" */ "./views/Operator.vue")
    },
    {
      path: "/news",
      name: "news",
      component: () => import(/* webpackChunkName: "news" */ "./views/News.vue")
    },
    {
      path: "/training",
      name: "training",
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/login')
        }
      },
      component: () =>
      import(/* webpackChunkName: "training" */ "./views/Training.vue"),
    },
    {
      path: "/lesson/create",
      name: "create-lesson",
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated'] && store.getters['user/isAdmin']) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "lesson" */ "./views/lesson/CreateLesson.vue")
    },
    {
      path: "/lesson/:slug/edit",
      name: "edit-lesson",
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated'] && store.getters['user/isAdmin']) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "lesson" */ "./views/lesson/EditLesson.vue")
    },
    {
      path: "/lesson/:slug",
      props: true,
      name: "view-lesson",
      component: () => import(/* webpackChunkName: "lesson" */ "./views/lesson/ViewLesson.vue")
    },
    {
      path: "/admin",
      name: 'admin',
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated'] && store.getters['user/isAdmin']) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "admin" */ "./views/Admin.vue"),
    },
    {
      path: "/design",
      name: "design",
      component: () =>
        import(/* webpackChunkName: "design" */ "./views/Design.vue")
    },
    {
      path: "*",
      name: "404",
      component: () => import(/* webpackChunkName: "404" */ "./views/404.vue")
    },
  ]
});
