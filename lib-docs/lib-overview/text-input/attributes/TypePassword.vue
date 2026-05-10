<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import TypePasswordExample from "./TypePassword.example.vue";
import typePasswordSource from "./TypePassword.example.vue?raw";
</script>

<template>
  <div id="content-type-password">
    <DocsExample
      header="Type-password"
      :subtitle="$t('overview.text-input.type-password.subtitle')"
      :component="TypePasswordExample"
      :source="typePasswordSource"
    />
  </div>
</template>
