import "./styles/main.scss";
import { createApp } from "vue";
import { router } from "./providers/router";
import App from "./App.vue";
import { i18n } from "./providers/i18n";
import { createVfm } from "vue-final-modal";
const vfm = createVfm();
import { store } from "./providers/store";
import "vue-final-modal/style.css";
import NmorphLibrary, { ru } from "./../../../library/src/main";
const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(vfm);
app.use(NmorphLibrary, { i18n: { messages: { ru }, locale: "en" } });
app.use(store);
app.mount("#app");
