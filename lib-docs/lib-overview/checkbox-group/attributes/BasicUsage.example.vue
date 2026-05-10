<script setup lang="ts">
import { NmorphCheckboxGroup } from "@nmorph/nmorph-ui-kit";

const options = [
  { id: "1", disabled: true, label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];

const value = ref(["2"]);
</script>

<template>
  <div class="checkbox-group-model-value-overview">
    <ClientOnly>
      <NmorphCheckboxGroup
        v-model="value"
        :options="options"
        direction="row"
        height="extra-thin"
      />
      <NmorphCheckboxGroup
        v-model="value"
        :options="options"
        direction="column"
        design="checkbox"
        height="thin"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.checkbox-group-model-value-overview {
  .nmorph-checkbox-group {
    margin-right: 24px;
  }
}
</style>
