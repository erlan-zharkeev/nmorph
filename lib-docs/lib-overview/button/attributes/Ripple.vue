<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import RippleExample from "./Ripple.example.vue";
import rippleSource from "./Ripple.example.vue?raw";
</script>

<template>
  <div id="content-ripple">
    <DocsExample
      header="Ripple"
      :subtitle="$t('overview.button.ripple.subtitle')"
      :component="RippleExample"
      :source="rippleSource"
    />
  </div>
</template>
