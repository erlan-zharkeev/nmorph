<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const value = ref(true);
</script>

<template>
  <div class="checkbox-model-value-overview">
    <ClientOnly>
      <NmorphCheckbox
        id="1"
        v-model="value"
        :label="$t('overview.checkbox.model-value.label')"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.checkbox-model-value-overview {
}
</style>
