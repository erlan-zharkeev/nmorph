import { defineNuxtPlugin } from "#app";
import { NmorphLibrary, ru, zh, en } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    i18n: {
      outsideMessagesMerge: true
    }
  };
  // @ts-expect-error
  nuxtApp.$i18n?.mergeLocaleMessage?.("ru", ru);
  // @ts-expect-error
  nuxtApp.$i18n?.mergeLocaleMessage?.("zh", zh);
  // @ts-expect-error
  nuxtApp.$i18n?.mergeLocaleMessage?.("en", en);

  if (process.client) nuxtApp.vueApp.use(NmorphLibrary, options);
});
