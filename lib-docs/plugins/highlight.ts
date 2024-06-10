import { defineNuxtPlugin } from "#app";
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("hljs", hljs);
});
