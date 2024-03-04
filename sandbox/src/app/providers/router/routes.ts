import MainPage from '@/pages/MainPage.vue';
import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'Главная',
    },
  },
];
