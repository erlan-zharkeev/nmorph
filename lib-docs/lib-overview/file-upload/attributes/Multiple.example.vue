<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="file-upload-multiple-overview">
    <ClientOnly>
      <NmorphFileUpload multiple />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.file-upload-multiple-overview {
  width: 300px;
}
</style>
