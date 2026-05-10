import { defineNuxtPlugin } from "#app";
import hljs from "highlight.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("hljs", hljs);
});
