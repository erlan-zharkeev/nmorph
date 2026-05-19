<script setup lang="ts">
import { ref } from "vue";
import { NmorphButton, NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

const value = ref([]);

const resetFiles = () => {
  value.value = [];
};
</script>

<template>
  <div class="file-upload-model-value-overview">
    <ClientOnly>
      <NmorphFileUpload v-model="value" />
      <NmorphButton text="Reset files" height="thin" @click="resetFiles" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.file-upload-model-value-overview {
  display: flex;
  flex-direction: column;
  gap: var(--indentation-03);
  width: 300px;
}
</style>
