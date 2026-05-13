<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tag-text-overview">
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
  </div>
</template>
