<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tag-design-overview">
    <NmorphTagItem value="1" :text="$t('overview.tag-one')" design="nmorph" />
    <NmorphTagItem value="2" :text="$t('overview.tag-two')" design="common" />
  </div>
</template>
