<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const text = ref("Lorem ipsum");
</script>

<template>
  <div class="text-input-clearable-overview">
    <NmorphTextInput clearable v-model="text" />
  </div>
</template>

<style lang="scss">
.text-input-clearable-overview {
}
</style>
