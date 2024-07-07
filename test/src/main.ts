import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@nmorph/nmorph-ui-kit/dist/style.css";
// import { useNmorph } from "@nmorph/nmorph-ui-kit";

// export const nmorph = useNmorph({});

createApp(App).use(router).mount("#app");
