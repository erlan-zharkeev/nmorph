<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import AnimatedExample from "./Animated.example.vue";
import animatedSource from "./Animated.example.vue?raw";
</script>

<template>
  <div id="content-animated">
    <DocsExample
      header="Animated"
      :subtitle="$t('overview.skeleton.animated.subtitle')"
      :component="AnimatedExample"
      :source="animatedSource"
    />
  </div>
</template>
