<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tag-text-overview">
    <ClientOnly>
      <NmorphTagItem
        value="1"
        :text="$t('overview.tag-one')"
        :removable="false"
      />
      <NmorphTagItem
        value="2"
        :text="$t('overview.tag-two')"
        :removable="false"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.tag-text-overview {
  .nmorph-tag-item {
    margin-right: 8px;
  }
}
</style>
