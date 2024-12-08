import { createApp } from "vue";
import App from "./App.vue";
import "@nmorph/nmorph-ui-kit/dist/style.css";
import { NmorphLibrary, ru, zh } from "@nmorph/nmorph-ui-kit";
import { i18n } from "source/providers/i18n";
import { router } from "source/providers/router";
import 'source/style.css';

const nmorphOptions = { i18n: { messages: { ru, zh }, locale: "ru" } };

// createApp(App).use(router).use(i18n).use(NmorphLibrary, nmorphOptions).mount("#app");

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(NmorphLibrary, nmorphOptions);
app.mount("#app");
