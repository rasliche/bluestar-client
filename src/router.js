import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

// lessons
import lessons from './helpers/lessons.js'
console.log(lessons)

import TrainingHome from "./views/lessons/TrainingHome.vue"

import store from './store'

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
      path: '/me',
      name: 'me',
      beforeEnter (to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: 'me' */ "./views/UserDashboard.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/operators",
      name: "operators",
      beforeEnter (to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "operators" */ "./views/Operators.vue")
    },
    {
      path: "/operators/:slug",
      name: "operator",
      beforeEnter (to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/login')
        }
      },
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
      beforeEnter: (to, from, next) => {
        next()
      },
      component: () => import(/* webpackChunkName: "training" */ "./views/Training.vue"),
      children: [
        ...lessons,
        { path: '', name: "training", component: TrainingHome },
      ]
    },
    {
      path: "/admin",
      name: "admin",
      beforeEnter (to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "admin" */ "./views/Admin.vue")
    },
    {
      path: '/quiz/create',
      name: 'quizcreate',
      beforeEnter (to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "quizcreate" */ "./views/quiz/CreateQuiz.vue")
    },
    {
      path: "*",
      redirect: '/'
    },
  ]
});
