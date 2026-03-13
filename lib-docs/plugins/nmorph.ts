import { defineNuxtPlugin } from "#app";
import { NmorphLibrary, ru, zh } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    i18n: {
      outsideMessagesMerge: true,
      messages: { ru, zh },
      // @ts-expect-error
      locale: nuxtApp.$i18n.locale.value,
    }
  };
  if (process.client) nuxtApp.vueApp.use(NmorphLibrary, options);
});
