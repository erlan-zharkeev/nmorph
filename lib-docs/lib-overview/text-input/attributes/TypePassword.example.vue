<script setup lang="ts">
import { NmorphButton, NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const typePassword = ref(true);
</script>

<template>
  <div class="text-input-type-password-overview">
    <ClientOnly>
      <NmorphButton
        :text="$t('overview.text-input.type-password.toggle')"
        @click="typePassword = !typePassword"
        class="type-input-button"
      />
      <NmorphTextInput :type-password="typePassword" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.text-input-type-password-overview {
  .type-input-button {
    margin-bottom: 8px;
  }
}
</style>
