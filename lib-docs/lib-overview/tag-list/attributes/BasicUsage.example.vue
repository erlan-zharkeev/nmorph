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
  {
    value: "locked",
    text: "Locked",
    removable: false,
    color: "var(--nmorph-warn-color)",
  },
]);

const selectedTag = ref<string | null>(null);
</script>

<template>
  <NmorphSpace direction="column" align="start">
    <NmorphTagList v-model="nmorphTags" />
    <NmorphTagList
      v-model="commonTags"
      v-model:selected-value="selectedTag"
      design="common"
      color="var(--nmorph-success-color)"
    />
  </NmorphSpace>
</template>
