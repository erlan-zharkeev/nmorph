import { defineNuxtPlugin } from "#app";
import { NmorphLibrary } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    i18n: {
      outsideMessagesMerge: true
    }
  }
  if (process.client) nuxtApp.vueApp.use(NmorphLibrary, options);
});
