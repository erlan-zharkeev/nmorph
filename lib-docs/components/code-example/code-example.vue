<template>
  <code ref="codeExample" :class="languageClass">
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
  if (codeExample.value) {
    $hljs.highlightElement(codeExample.value);
  }
});

const codeExample = ref(null);
const { $hljs } = useNuxtApp();
</script>
