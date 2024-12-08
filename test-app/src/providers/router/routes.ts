import MainPage from "source/pages/MainPage.vue";
import FormPage from "source/pages/FormPage.vue";
import DatePickerPage from "source/pages/DatePickerPage.vue";
import Data from "source/pages/Data.vue";
import PaginationPage from "source/pages/PaginationPage.vue";
import Basic from "source/pages/Basic.vue";

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
    path: "/basic",
    component: () => Basic,
    meta: {
      title: "Basic",
    },
  },
  {
    path: "/data",
    component: () => Data,
    meta: {
      title: "Data",
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
    path: "/pagination",
    component: () => PaginationPage,
    meta: {
      title: "Pagination",
    },
  },
];
