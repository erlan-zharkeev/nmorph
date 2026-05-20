<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tag-text-overview">
    <NmorphTagItem value="1" text="Tag one" :removable="false" />
    <NmorphTagItem value="2" text="Tag two" :removable="false" />
  </div>
</template>
