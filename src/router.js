import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)


let router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: '/clients',
          name: 'clients',
          meta: { 
            requiresAuth: true
        },
          component: () => import(/* webpackChunkName: "demo" */ './views/Client/Clients.vue')
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        // {
        //   path: '/maps',
        //   name: 'maps',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        // },
        // {
        //   path: '/tables',
        //   name: 'tables',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        // },
        {
          path: '/detail',
          name: 'detail',
          props: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/Client/ClientDetail.vue')
        },
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue'),
          meta: { 
            guest: true
        }
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue'),
          meta: { 
            guest: true
        }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if(to.fullPath == '/logout'){
    localStorage.setItem('token', 'invalid')
  }
  const loggedIn = localStorage.getItem('token');


  if (authRequired && (!loggedIn || loggedIn == 'invalid' )) {
    return next('/login');
  }

  next();
}
);


export default router;