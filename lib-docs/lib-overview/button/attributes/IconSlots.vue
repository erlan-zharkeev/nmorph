<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import IconSlotsExample from "./IconSlots.example.vue";
import iconSlotsSource from "./IconSlots.example.vue?raw";
</script>

<template>
  <div id="content-icon-slots">
    <DocsExample
      header="Icon slots"
      :subtitle="$t('overview.button.icon-slots.subtitle')"
      :component="IconSlotsExample"
      :source="iconSlotsSource"
    />
  </div>
</template>
