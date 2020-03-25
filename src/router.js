import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'

Vue.use(Router)

export default new Router({
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
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "register-admin" */ './views/RegisterAdmin.vue')
    },
    {
      path: '/me',
      name: 'me',
      beforeEnter(to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          // store.dispatch('alert/setAlert', {
          //   type: "error",
          //   text: "You must be logged in to visit that page!"
          // })
          next('login')
        }
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
      beforeEnter(to, from, next) {
        if (store.getters['auth/token'] && store.getters['user/isAdmin']) {
          next()
        } else {
          next('/login')
        }
      },
      // route level code-splitting
      // this generates a separate chunk (user.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "view-user" */ './views/user/User.vue')
    },
    {
      path: '/news',
      name: 'news',
      beforeEnter(to, from, next) {
        console.log('Entered the news zone...')
        next()
      },
      component: () => import(/* webpackChunkName: "news" */ './views/News.vue')
    },
    {
      path: '/training',
      name: 'training',
      beforeEnter(to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/login')
        }
      },
      component: () =>
        import(/* webpackChunkName: "training" */ './views/Training.vue')
    },
    {
      path: '/lesson/create',
      name: 'create-lesson',
      beforeEnter(to, from, next) {
        if (
          store.getters['auth/isAuthenticated'] &&
          store.getters['user/isAdmin']
        ) {
          next()
        } else {
          next('/login')
        }
      },
      component: () =>
        import(/* webpackChunkName: "create-lesson" */ './views/lesson/CreateLesson.vue')
    },
    {
      path: '/lesson/:lessonId/edit',
      name: 'edit-lesson',
      props: true, // receive lessonId route parameter as the prop to fetch lesson
      beforeEnter(to, from, next) {
        if (
          store.getters['auth/isAuthenticated'] &&
          store.getters['user/isAdmin']
        ) {
          next()
        } else {
          next('/login')
        }
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
      beforeEnter(to, from, next) {
        if (
          store.getters['auth/isAuthenticated'] &&
          store.getters['user/isAdmin']
        ) {
          next()
        } else {
          next('/login')
        }
      },
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/Admin.vue')
    },
    {
      path: '/design',
      name: 'design',
      beforeEnter(to, from, next) {
        if (
          store.getters['auth/isAuthenticated'] &&
          store.getters['user/isAdmin']
        ) {
          next()
        } else {
          next('/login')
        }
      },
      component: () =>
        import(/* webpackChunkName: "design" */ './views/Design.vue')
    },
    {
      path: '/buoys',
      name: 'buoys',
      beforeEnter(to, from, next) {
        console.log('Entered the Buoy Zone...')
        next()
      },
      component: () => import(/* webpackChunkName: "BuoyReport" */ './views/BuoyReport.vue')
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
