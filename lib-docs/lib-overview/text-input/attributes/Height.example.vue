<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="text-input-height-overview">
    <ClientOnly>
      <NmorphTextInput
        height="thick"
        :placeholder="$t('overview.enter-text')"
      />
      <NmorphTextInput
        height="basic"
        :placeholder="$t('overview.enter-text')"
      />
      <NmorphTextInput height="thin" :placeholder="$t('overview.enter-text')" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.text-input-height-overview {
  display: flex;
  align-items: center;

  .nmorph-text-input {
    margin-right: 8px;
  }
}
</style>
