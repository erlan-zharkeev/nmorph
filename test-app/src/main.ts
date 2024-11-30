"use strict";
import { createApp } from "vue";
import App from "./App.vue";
import "@nmorph/nmorph-ui-kit/dist/style.css";
import { NmorphLibrary, ru } from "@nmorph/nmorph-ui-kit";

const nmorphOptions = { i18n: { messages: { ru }, locale: "ru" } };

createApp(App).use(NmorphLibrary, nmorphOptions).mount("#app");
