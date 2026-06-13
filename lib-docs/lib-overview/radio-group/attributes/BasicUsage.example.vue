<script setup lang="ts">
import { NmorphRadioGroup } from "@nmorph/nmorph-ui-kit";

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two", disabled: true },
  { value: "three", label: "Three" },
];
const value = ref("three");
</script>

<template>
  <div class="radio-group-model-value-overview">
    <div class="radio-group-el">
      <NmorphRadioGroup
        :options="options"
        v-model="value"
        thickness="thin"
      />
    </div>
    <div class="radio-group-el">
      <NmorphRadioGroup
        :options="options"
        v-model="value"
        direction="column"
        design="plain"
        thickness="extra-thin"
      />
    </div>
  </div>
</template>

<style lang="scss">
.radio-group-model-value-overview {
  .radio-group-el {
    margin-bottom: 8px;
  }
}
</style>
