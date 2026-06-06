<script setup lang="ts">
import { NmorphText } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="text-basic-usage">
    <NmorphText as="h3" variant="title" weight="bold">
      Dashboard status
    </NmorphText>
    <NmorphText variant="body">
      NmorphText keeps typography roles consistent across headings, labels, and helper copy.
    </NmorphText>
    <NmorphText color="semi-contrast" variant="caption" truncate>
      Long secondary text can be truncated when it needs to stay inside a compact row.
    </NmorphText>
  </div>
</template>

<style scoped>
.text-basic-usage {
  display: grid;
  width: min(100%, 520px);
  gap: 8px;
}
</style>
