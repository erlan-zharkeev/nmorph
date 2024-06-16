import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@nmorph/nmorph-ui-kit/dist/style.css";

createApp(App).use(router).mount("#app");
