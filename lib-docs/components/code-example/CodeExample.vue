<template>
  <code ref="codeExample" :class="languageClass">
    <slot />
  </code>
</template>

<script setup>
import { nextTick, onMounted, onUpdated, ref } from "vue";
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

const highlight = () => {
  if (codeExample.value) {
    codeExample.value.removeAttribute("data-highlighted");
    $hljs.highlightElement(codeExample.value);
  }
};

onMounted(() => nextTick(highlight));
onUpdated(() => nextTick(highlight));

const codeExample = ref(null);
const { $hljs } = useNuxtApp();
</script>
