<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tag-design-overview">
    <ClientOnly>
      <NmorphTagItem value="1" :text="$t('overview.tag-one')" design="nmorph" />
      <NmorphTagItem value="2" :text="$t('overview.tag-two')" design="common" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.tag-design-overview {
}
</style>
