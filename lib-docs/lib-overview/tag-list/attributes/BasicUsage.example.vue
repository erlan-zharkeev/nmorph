<script setup lang="ts">
import { ref } from "vue";
import { NmorphSpace, NmorphTagList } from "@nmorph/nmorph-ui-kit";

const nmorphTags = ref([
  { value: "status", text: "Status" },
  { value: "priority", text: "Priority" },
  { value: "locked", text: "Locked", removable: false },
]);

const commonTags = ref([
  { value: "status", text: "Status" },
  { value: "priority", text: "Priority" },
  { value: "locked", text: "Locked", removable: false },
]);
</script>

<template>
  <NmorphSpace direction="column" align="start">
    <NmorphTagList v-model="nmorphTags" />
    <NmorphTagList v-model="commonTags" design="common" />
  </NmorphSpace>
</template>
