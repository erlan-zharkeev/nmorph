import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import NmorphLibrary, { ru } from "@nmorph/nmorph-ui-kit";
import "@nmorph/nmorph-ui-kit/dist/style.css";

const nmorphOptions = { i18n: { messages: { ru }, locale: "en" } };

createApp(App).use(router).use(NmorphLibrary, nmorphOptions).mount("#app");
