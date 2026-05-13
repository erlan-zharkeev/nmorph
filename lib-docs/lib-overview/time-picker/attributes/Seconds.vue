<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import SecondsExample from "./Seconds.example.vue";
import secondsSource from "./Seconds.example.vue?raw";
</script>

<template>
  <div id="content-seconds">
    <DocsExample header="Seconds" :component="SecondsExample" :source="secondsSource" />
  </div>
</template>
