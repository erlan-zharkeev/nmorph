<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="file-upload-photo-with-preview-overview">
    <ClientOnly>
      <NmorphFileUpload photo-with-preview />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.file-upload-photo-with-preview-overview {
  width: 300px;
}
</style>
