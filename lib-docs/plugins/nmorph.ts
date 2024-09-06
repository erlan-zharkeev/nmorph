import { defineNuxtPlugin } from "#app";
import NmorphLibrary, { type INmorphOptions, ru } from "@nmorph/nmorph-ui-kit";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // const options: INmorphOptions = {
    //   i18n: {
    //     messages: nuxtApp.$i18n.messages.value,
    //     locale: nuxtApp.$i18n.locale.value,
    //   },
    // };
    // console.log(nuxtApp.$i18n.locales.value, "app");
    const options = {
      // i18n: { messages: { ru }, locale: "en" },
      i18n: {
        outsideMessagesMerge: true,
      },
    };

    nuxtApp.vueApp.use(NmorphLibrary, options);
  }
});
