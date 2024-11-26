"use strict";
import { createApp } from "vue";
import App from "./App.vue";
import "@nmorph/nmorph-ui-kit/dist/style.css";
import { NmorphLibrary } from "@nmorph/nmorph-ui-kit";
// import ru from "@nmorph/nmorph-ui-kit";
// console.log(ru);

// import NmorphLibrary, { ru } from "./../../library/src/main";

// const nmorphOptions = { i18n: { messages: { ru }, locale: "en" } };

createApp(App).use(NmorphLibrary, {}).mount("#app");
