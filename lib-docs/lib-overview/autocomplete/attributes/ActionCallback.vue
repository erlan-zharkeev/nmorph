<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ActionCallbackExample from "./ActionCallback.example.vue";
import actionCallbackSource from "./ActionCallback.example.vue?raw";
</script>

<template>
  <div id="content-action-callback">
    <DocsExample
      header="Action-callback"
      :subtitle="$t('overview.autocomplete.action-callback.subtitle')"
      :component="ActionCallbackExample"
      :source="actionCallbackSource"
    />
  </div>
</template>
