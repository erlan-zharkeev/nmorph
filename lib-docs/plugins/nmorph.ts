import { defineNuxtPlugin } from "#app";
import NmorphLibrary, { type INmorphOptions } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const options: INmorphOptions = {};
    nuxtApp.vueApp.use(NmorphLibrary, options);
  }
});
