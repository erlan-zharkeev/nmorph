import MainPage from './../../../pages/MainPage.vue';
import Form from './../../../pages/Form.vue';

import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'Main',
    },
  },
  {
    path: '/form',
    component: Form,
    meta: {
      title: 'Form',
    },
  },
];
