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
    <NmorphFileUpload v-model="value" />
    <NmorphButton text="Reset files" thickness="thin" @click="resetFiles" />
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
