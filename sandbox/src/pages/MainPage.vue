<template>
  <div class="wrapper"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two", disabled: true },
  { value: "three", label: "Three" },
];

const date = ref([new Date(), new Date()]);
</script>

<style scoped>
.wrapper {
  width: 700px;
  display: flex;
  margin-top: 50px;
}
.nmorph-slider {
  --value-fixed-container-width: 300px;
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
