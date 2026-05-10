<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const text = ref("");
const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
</script>

<template>
  <div class="autocomplete-basic-usage-overview">
    <ClientOnly>
      <NmorphAutocomplete
        v-model="text"
        :list="list"
        :placeholder="$t('overview.autocomplete.basic-usage.placeholder')"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.autocomplete-basic-usage-overview {
}
</style>
