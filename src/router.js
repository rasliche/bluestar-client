import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register-admin',
      name: 'register-admin',
      component: () =>
        import(/* webpackChunkName: "register-admin" */ './views/RegisterAdmin.vue')
    },
    {
      path: '/me',
      name: 'me',
      meta: {
        requiresAuth: true,
      },
      beforeEnter(to, from, next) {
        store.dispatch('user/getUserOperators')
        store.dispatch('operator/getOperators')
        next()
      },
      component: () => import(/* webpackChunkName: 'me' */ './views/Me.vue')
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
      path: '/operators/:operatorId',
      props: true,
      name: 'view-operator',
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(/* webpackChunkName: "view-operator" */ './views/Operator.vue')
    },
    {
      path: '/programs',
      props: false,
      name: 'programs',
      component: () => import(/* webpackChunkName: "programs" */ './views/Programs.vue')
    },
    {
      path: '/users/:userId',
      props: true,
      name: 'view-user',
      meta: {
        requiresAdmin: true,
      },
      component: () =>
        import(/* webpackChunkName: "view-user" */ './views/user/User.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "news" */ './views/News.vue')
    },
    {
      path: '/training',
      name: 'training',
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(/* webpackChunkName: "training" */ './views/Training.vue')
    },
    {
      path: '/lesson/create',
      name: 'create-lesson',
      meta: {
        requiresAdmin: true,
      },
      component: () =>
        import(/* webpackChunkName: "create-lesson" */ './views/lesson/CreateLesson.vue')
    },
    {
      path: '/lesson/:lessonId/edit',
      name: 'edit-lesson',
      props: true, // receive lessonId route parameter as the prop to fetch lesson
      meta: {
        requiresAdmin: true,
      },
      component: () =>
        import(/* webpackChunkName: "edit-lesson" */ './views/lesson/EditLesson.vue')
    },
    {
      path: '/lesson/:lessonId',
      name: 'view-lesson',
      props: true, // receive lessonId route parameter as the prop to fetch lesson
      component: () =>
        import(/* webpackChunkName: "view-lesson" */ './views/lesson/ViewLesson.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requiresAdmin: true
      },
      beforeEnter(to, from, next) {
        store.dispatch('program/getPrograms')
        store.dispatch('user/getUsers')
        store.dispatch('lesson/getLessons')
        store.dispatch('operator/getOperators')
        next()
      },
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/Admin.vue')
    },
    {
      path: '/design',
      name: 'design',
      meta: {
        requiresAdmin: true
      },
      component: () =>
        import(/* webpackChunkName: "design" */ './views/Design.vue')
    },
    {
      path: '/bluestarbingo',
      name: 'bluestar-bingo',
      component: () => 
        import(/* webpackChunkName: "bluestar-bingo" */ './views/extras/BlueStarBingo.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue')
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: () => import(/* webpackChunkName: "NetworkIssue" */ './views/NetworkIssue.vue')
    },
    {
      path: '/*',
      redirect: { name: '404'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("Auth Required!")
    if (!store.getters['auth/isAuthenticated']) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    console.log("No Auth Required!")
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    console.log("Admin Required!")
    if (!store.getters['auth/isAuthenticated'] || !store.state.user.user.isAdmin) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    console.log("No Admin Required!")
    next()
  }
})


export default router