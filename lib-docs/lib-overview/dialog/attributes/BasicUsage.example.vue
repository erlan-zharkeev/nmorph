<script setup lang="ts">
import { NmorphDialog, NmorphButton } from "@nmorph/nmorph-ui-kit";

const dialogVisibility = ref(false);

const showModalHandler = () => {
  dialogVisibility.value = true;
};
</script>

<template>
  <div class="dialog-basic-usage-overview">
    <ClientOnly>
      <NmorphButton @click="showModalHandler" text="Show modal window" />
      <NmorphDialog
        v-model="dialogVisibility"
        title="Lorem Ipsum"
        :close-on-overlay="false"
        width="320px"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </NmorphDialog>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.dialog-basic-usage-overview {
}
</style>
