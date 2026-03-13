import { defineNuxtPlugin } from "#app";
import { NmorphLibrary, ru, zh } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    i18n: {
      outsideMessagesMerge: true,
      // @ts-expect-error
      locale: nuxtApp.$i18n.locale.value,
    }
  };

  // @ts-expect-error
  nuxtApp.$i18n?.mergeLocaleMessage?.("ru", ru);
  // @ts-expect-error
  nuxtApp.$i18n?.mergeLocaleMessage?.("zh", zh);

  if (process.client) nuxtApp.vueApp.use(NmorphLibrary, options);
});
