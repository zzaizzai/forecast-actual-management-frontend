import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FoodView from '@/views/Food/FoodView.vue'
import OrderHistoryView from '@/views/OrderView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MyPageView from '@/views/MyPageView.vue'
import FoodAddView from '@/views/Food/FoodAddView.vue'
import FoodEditView from '@/views/Food/FoodEditView.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/foods',
    name: 'foods',
    component: FoodView
  },
  {
    path: '/foodadd',
    name: 'foodadd',
    component: FoodAddView
  },
  {
    path: '/foodedit',
    name: 'foodedit',
    component: FoodEditView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderHistoryView
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: OrderDetailView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  store.commit('clearMsg'); // Celar All Msg
  store.dispatch("checkToken")
  next();

});


export default router
