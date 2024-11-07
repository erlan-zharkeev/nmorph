<template>
  <div class="wrapper">
    <NmorphFileUpload />
  </div>
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
  /* width: 700px;
  display: flex;
  margin-top: 50px; */
}
</style>
