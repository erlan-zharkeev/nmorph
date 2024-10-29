<template>
  <div class="wrapper">
    <NmorphCheckboxGroup
      v-model="value"
      :options="options"
      direction="column"
    />
    <NmorphCheckboxGroup
      v-model="value"
      :options="options"
      direction="row"
      design="button"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NmorphCheckboxGroup from "../../../library/src/components/form/nmorph-checkbox-group/NmorphCheckboxGroup.vue";

const options = [
  { id: "1", disabled: true, label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];

const value = ref(["2"]);
</script>

<style scoped>
.wrapper {
  width: 50%;
}
.nmorph-tab-content {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 8px;
}

.wrapper-one {
  position: relative;
}

.nmorph-tabs__label {
  cursor: pointer;
  font-weight: bold;
  padding: 8px 0;
}
</style>
