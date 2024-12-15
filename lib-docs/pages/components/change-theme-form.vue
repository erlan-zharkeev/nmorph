<script setup lang="ts">
import { useGlobalStore } from '~/providers';

const form = reactive({
  main: { value: "#eaf2f9", rules: [] },
  text: { value: "#687b9e", rules: [] },
  accent: { value: "#006cb6", rules: [] },
});

const store = useGlobalStore();

const submitNewThemeHandler = () => {
  const newVars: { name: string; color: string }[] =
    store.getDynamicColorVariables(form.main.value);
  newVars.push({ name: "--nmorph-main-color", color: form.main.value });
  newVars.push({ name: "--nmorph-text-color", color: form.text.value });
  newVars.push({ name: "--nmorph-accent-color", color: form.accent.value });

  let styleElement = document.querySelector(
    "#nmorph-theme-styles"
  ) as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "nmorph-theme-styles";
    document.head.appendChild(styleElement);
  }
  let newStyles = `:root[nmorph-data-theme="${store.currentTheme}"] {\n`;
  newVars.forEach((el) => {
    newStyles += `  ${el.name}: ${el.color};\n`;
  });
  newStyles += `}\n`;
  styleElement.innerHTML = newStyles;
};
</script>

<template></template>
