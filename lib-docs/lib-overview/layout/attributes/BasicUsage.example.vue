<script setup lang="ts">
import { NmorphCard, NmorphLayout } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <NmorphLayout class="layout-basic-usage-overview" gap="12px" aside-width="120px">
    <template #header>
      <NmorphCard>Header</NmorphCard>
    </template>
    <template #aside>
      <NmorphCard>Aside</NmorphCard>
    </template>
    <NmorphCard>Main content</NmorphCard>
    <template #footer>
      <NmorphCard>Footer</NmorphCard>
    </template>
  </NmorphLayout>
</template>

<style lang="scss">
.layout-basic-usage-overview {
  max-width: 520px;

  .nmorph-card {
    width: 100%;
  }
}
</style>
