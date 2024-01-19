import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/index.vue'),
      children: [
        {
          path: '/gzt',
          name: 'gzt',
          component: () => import('../views/admin/gzt.vue')
        },
        {
          path: '/card',
          name: 'card',
          component: () => import('../views/admin/card.vue')
        },
      ],
      
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/add.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(token){
    next()
  }else{
    if(to.path == '/admin'){
      next('/')
    }else{
      next() // 放行
    }
  }
})

export default router
