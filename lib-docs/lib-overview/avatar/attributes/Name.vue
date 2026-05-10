<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import NameExample from "./Name.example.vue";
import nameSource from "./Name.example.vue?raw";
</script>

<template>
  <div id="content-name">
    <DocsExample
      header="Name"
      :subtitle="$t('overview.avatar.name.subtitle')"
      :component="NameExample"
      :source="nameSource"
    />
  </div>
</template>
