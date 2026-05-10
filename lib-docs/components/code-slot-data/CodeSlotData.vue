<template>
  <template v-if="props.blocks?.length">
    <code-example
      v-for="block in props.blocks"
      :key="block.source"
      :lang="block.lang"
    >
      {{ block.source }}
    </code-example>
  </template>
  <template v-else>
    <code-example v-if="props.templateData" lang="html">{{
      props.templateData
    }}</code-example>
    <code-example v-if="props.scriptData" lang="javascript">{{
      props.scriptData
    }}</code-example>
    <code-example v-if="props.cssData" lang="css">{{
      props.cssData
    }}</code-example>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  blocks?: { lang: string; source: string }[];
  templateData?: string;
  scriptData?: string;
  cssData?: string;
}>();
</script>
