import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';

import Main from '@/views/MainPage.vue';
import Login from '@/views/LoginPage.vue';

Vue.use(VueRouter);

function Auth(to, from, next){
  if(store.getters.isAuth){
    next();
    return;
  }
  router.push({name: 'login'});
}

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta:{
      title: 'Главная страница',
    },
    beforeEnter: Auth,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      title: 'Вход',
    }
  }
];

const router =   new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})

export default router;