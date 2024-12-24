import { defineNuxtPlugin } from "#app";
import { NmorphLibrary } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) nuxtApp.vueApp.use(NmorphLibrary, {
    i18n: {
      outsideMessagesMerge: true
    }
  });
});
