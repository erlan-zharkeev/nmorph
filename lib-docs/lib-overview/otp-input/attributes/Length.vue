<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import LengthExample from "./Length.example.vue";
import lengthSource from "./Length.example.vue?raw";
</script>

<template>
  <div id="content-length">
    <DocsExample
      header="Length"
      :subtitle="$t('overview.otp-input.length.subtitle')"
      :component="LengthExample"
      :source="lengthSource"
    />
  </div>
</template>
