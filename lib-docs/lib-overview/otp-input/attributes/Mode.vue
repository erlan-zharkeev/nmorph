<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ModeExample from "./Mode.example.vue";
import modeSource from "./Mode.example.vue?raw";
</script>

<template>
  <div id="content-mode">
    <DocsExample
      header="Mode"
      :subtitle="$t('overview.otp-input.mode.subtitle')"
      :component="ModeExample"
      :source="modeSource"
    />
  </div>
</template>
