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
    <ClientOnly>
      <div class="radio-group-el">
        <NmorphRadioGroup
          :options="options"
          v-model="value"
          height="extra-thin"
        />
      </div>
      <div class="radio-group-el">
        <NmorphRadioGroup
          :options="options"
          v-model="value"
          direction="column"
          style-type="radio-style"
          height="thin"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.radio-group-model-value-overview {
  .radio-group-el {
    margin-bottom: 8px;
  }
}
</style>
