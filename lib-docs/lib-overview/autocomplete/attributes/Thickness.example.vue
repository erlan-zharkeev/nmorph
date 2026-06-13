<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const text = ref("");
const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
</script>

<template>
  <div class="autocomplete-thickness-overview">
    <NmorphAutocomplete thickness="thick" v-model="text" :list="list" />
    <NmorphAutocomplete thickness="basic" :list="list" />
    <NmorphAutocomplete thickness="thin" :list="list" />
  </div>
</template>

<style lang="scss">
.autocomplete-thickness-overview {
  display: flex;
  align-items: center;

  .nmorph-autocomplete {
    margin-right: 8px;
  }
}
</style>
