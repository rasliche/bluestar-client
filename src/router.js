import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

// lessons
import TrainingHome from "./views/lessons/TrainingHome.vue"
import Lesson from "./views/lessons/Lesson.vue"
import MangrovesAndSeagrasses from "./views/lessons/MangrovesAndSeagrasses.vue"
import AboutFKNMS from "./views/lessons/AboutFKNMS.vue"

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
      // beforeEnter (to, from, next) {
      //   if (store.state.token) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // },
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
      // beforeEnter (to, from, next) {
      //   if (store.state.token) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // },
      component: () => import(/* webpackChunkName: "operators" */ "./views/Operators.vue")
    },
    {
      path: "/operators/:slug",
      name: "operator",
      // beforeEnter (to, from, next) {
      //   if (store.state.token) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // },
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
        console.log("Entered Training Route")
        next()
      },
      component: () => import(/* webpackChunkName: "training" */ "./views/Training.vue"),
      children: [
        { path: '', name: "training", component: TrainingHome },
        { path: ':slug', name: "lesson", component: Lesson },
        { path: 'mangroves-and-seagrasses', name: 'mangroves-and-seagrasses', component: MangrovesAndSeagrasses },
        { path: 'about-fknms', name: 'about-fknms', component: AboutFKNMS },
      ]
    },
    {
      path: "/admin",
      // beforeEnter (to, from, next) {
      //   if (store.state.token) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // },
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'), 
      children: [
        { path: '', name: 'admin', component: () => import(/* webpackChunkName: "admin" */ "./views/admin/AdminHome.vue") },
        { path: 'lesson/new', name: 'lessoncreate', component: () => import(/* webpackChunkName: "lessoncreate" */ "./views/admin/CreateLesson.vue") },
        { path: 'operator/new', name: 'operatorcreate', component: () => import(/* webpackChunkName: "operatorcreate" */ "./views/admin/CreateOperator.vue") },
        { path: 'quiz/new', name: 'quizcreate', component: () => import(/* webpackChunkName: "quizcreate" */ "./views/admin/CreateQuiz.vue") },
      ]
    },
    {
      path: "*",
      redirect: '/'
    },
  ]
});
