<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const text = ref("");
const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
</script>

<template>
  <div class="autocomplete-height-overview">
    <ClientOnly>
      <NmorphAutocomplete height="thick" v-model="text" :list="list" />
      <NmorphAutocomplete height="basic" :list="list" />
      <NmorphAutocomplete height="thin" :list="list" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.autocomplete-height-overview {
  display: flex;
  align-items: center;

  .nmorph-autocomplete {
    margin-right: 8px;
  }
}
</style>
