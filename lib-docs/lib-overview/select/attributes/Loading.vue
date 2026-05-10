<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import LoadingExample from "./Loading.example.vue";
import loadingSource from "./Loading.example.vue?raw";
</script>

<template>
  <div id="content-loading">
    <DocsExample
      header="Loading"
      :subtitle="$t('overview.select.loading.subtitle')"
      :component="LoadingExample"
      :source="loadingSource"
    />
  </div>
</template>
