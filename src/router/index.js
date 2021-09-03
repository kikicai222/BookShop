import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login.vue'
import Home from '../views/home/Home.vue'
import Welcome from '../components/welcome/Welcome.vue'
import Users from '../views/user/Users.vue'
import Rights from '../views/power/Rights.vue'
import Roles from '../views/power/Roles.vue'
import Cate from '../views/goods/Cate.vue'
import Params from '../views/goods/Params.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
      path: '/welcome',
      component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
 //to将要访问的路径
 //from代表从那个路径跳转而来
 //next是一个函数，表示放行
 //   next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
