<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="file-upload-disabled-overview">
    <ClientOnly>
      <NmorphFileUpload disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.file-upload-disabled-overview {
}
</style>
