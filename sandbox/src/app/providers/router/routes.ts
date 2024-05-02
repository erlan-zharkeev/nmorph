import MainPage from './../../../pages/MainPage.vue';
import FormPage from './../../../pages/FormPage.vue';
import TablePage from './../../../pages/TablePage.vue';
import DatePickerPage from './../../../pages/DatePickerPage.vue';
import CalendarPage from './../../../pages/CalendarPage.vue';

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
    component: FormPage,
    meta: {
      title: 'Form',
    },
  },
  {
    path: '/table',
    component: TablePage,
    meta: {
      title: 'Table',
    },
  },
  {
    path: '/date-picker',
    component: DatePickerPage,
    meta: {
      title: 'Date picker',
    },
  },
  {
    path: '/calendar',
    component: CalendarPage,
    meta: {
      title: 'Calendar',
    },
  },
];
