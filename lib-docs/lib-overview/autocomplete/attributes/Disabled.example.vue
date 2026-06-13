<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="autocomplete-disabled-overview">
    <NmorphAutocomplete :list="[]" disabled />
  </div>
</template>
