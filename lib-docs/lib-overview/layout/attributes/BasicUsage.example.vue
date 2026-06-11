<script setup lang="ts">
import { NmorphCard, NmorphLayout } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <NmorphLayout class="layout-basic-usage-overview" gap="12px" aside-width="120px">
    <template #header>
      <NmorphCard :paper="3">Header</NmorphCard>
    </template>
    <template #aside>
      <NmorphCard :paper="3">Aside</NmorphCard>
    </template>
    <NmorphCard :paper="3">Main content</NmorphCard>
    <template #footer>
      <NmorphCard :paper="3">Footer</NmorphCard>
    </template>
  </NmorphLayout>
</template>

<style lang="scss">
.layout-basic-usage-overview {
  width: 100%;
  min-height: 260px;

  .nmorph-card {
    width: 100%;
    min-height: 72px;
    display: flex;
    align-items: center;
  }
}
</style>
