<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

const value = ref([]);
</script>

<template>
  <div class="file-upload-model-value-overview">
    <ClientOnly>
      <NmorphFileUpload v-model="value" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.file-upload-model-value-overview {
  width: 300px;
}
</style>
