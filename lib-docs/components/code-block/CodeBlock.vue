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

<style scoped></style>
