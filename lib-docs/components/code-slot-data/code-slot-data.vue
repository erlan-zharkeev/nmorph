<template>
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

<script setup lang="ts">
const props = defineProps<{
  templateData?: string;
  scriptData?: string;
  cssData?: string;
}>();
</script>
