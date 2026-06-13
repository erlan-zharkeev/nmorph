<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

const value = ref("review");
const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
];
</script>

<template>
  <div class="select-fill-overview">
    <NmorphSelect v-model="value" :options="options" fill />
  </div>
</template>

<style lang="scss">
.select-fill-overview {
  width: 100%;
}
</style>
