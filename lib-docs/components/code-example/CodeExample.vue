<template>
  <code ref="codeExample" :class="languageClass">
    <slot />
  </code>
</template>

<script setup>
import { computed, nextTick, onMounted, onUpdated, ref } from "vue";
import { useNuxtApp } from "#app";

const languageAliases = {
  html: "xml",
  vue: "xml",
};

const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
});

const normalizedLanguage = computed(() => languageAliases[props.lang] || props.lang);
const languageClass = computed(() => `language-${normalizedLanguage.value}`);

const highlight = () => {
  if (!codeExample.value) return;

  const code = codeExample.value.textContent || "";
  const language = normalizedLanguage.value;
  const highlightedCode = $hljs.getLanguage(language)
    ? $hljs.highlight(code, { language, ignoreIllegals: true }).value
    : $hljs.highlightAuto(code).value;

  codeExample.value.innerHTML = highlightedCode;
  codeExample.value.classList.add("hljs");
};

onMounted(() => nextTick(highlight));
onUpdated(() => nextTick(highlight));

const codeExample = ref(null);
const { $hljs } = useNuxtApp();
</script>
