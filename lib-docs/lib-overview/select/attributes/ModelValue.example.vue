<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

const value = ref("one");
const options = ref([
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
]);
const multipleValue = ref(["one", "two"]);
</script>

<template>
  <div class="select-model-value-overview">
    <ClientOnly>
      <div class="select-element">
        <NmorphSelect v-model="value" :options="options" />
      </div>
      <div class="select-element">
        <NmorphSelect
          v-model="multipleValue"
          :options="options"
          no-element-placeholder="Multiple values"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-model-value-overview {
  display: flex;
  flex-wrap: wrap;

  .nmorph-select {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
