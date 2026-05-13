<script setup lang="ts">
import { ref } from "vue";
import { NmorphTagList } from "@nmorph/nmorph-ui-kit";

const tags = ref([
  { value: "status", text: "Status" },
  { value: "priority", text: "Priority" },
  { value: "locked", text: "Locked", removable: false },
]);
</script>

<template>
  <NmorphTagList v-model="tags" />
</template>
