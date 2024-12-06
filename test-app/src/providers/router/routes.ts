import MainPage from "source/pages/MainPage.vue";
import FormPage from "source/pages/FormPage.vue";
import DatePickerPage from "source/pages/DatePickerPage.vue";
import CalendarPage from "source/pages/CalendarPage.vue";
import PaginationPage from "source/pages/PaginationPage.vue";
import TestPage from "source/pages/TestPage.vue";

import { type RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => MainPage,
    meta: {
      title: "Main",
    },
  },
  {
    path: "/form",
    component: () => FormPage,
    meta: {
      title: "Form",
    },
  },
  {
    path: "/date-picker",
    component: () => DatePickerPage,
    meta: {
      title: "Date picker",
    },
  },
  {
    path: "/calendar",
    component: () => CalendarPage,
    meta: {
      title: "Calendar",
    },
  },
  {
    path: "/pagination",
    component: () => PaginationPage,
    meta: {
      title: "Pagination",
    },
  },
  {
    path: "/test",
    component: () => TestPage,
    meta: {
      title: "Test",
    },
  },
];
