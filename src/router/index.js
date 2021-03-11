import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { needLogin: false },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { needLogin: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin && store.getters.isLogin === false) { next('/login'); } else { next(); }
});
export default router;
