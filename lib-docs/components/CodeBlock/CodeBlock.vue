<template>
  <code ref="codeBlock" :class="languageClass">
    <slot />
  </code>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
const languageClass = ref("");

const props = defineProps({
  sourceCode: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
});

watchEffect(() => {
  languageClass.value = `language-${props.lang}`;
});

onMounted(() => {
  if (codeBlock.value) {
    $hljs.highlightElement(codeBlock.value);
  }
});

const codeBlock = ref(null);
const { $hljs } = useNuxtApp();
</script>

<style scoped>
/* pre {
  padding: 1em;
  background: #f5f5f5;
  border-radius: 4px;
  overflow-x: auto;
} */
</style>
