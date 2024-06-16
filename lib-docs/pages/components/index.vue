<script setup lang="ts">
import { DocsElements } from "~/lib-components/docs-button";
</script>

<template>
  <div class="docs-button component-page">
    <div v-for="(el, idx) in DocsElements" :key="idx">
      <component :is="el" />
    </div>
  </div>
</template>

<style lang="scss"></style>
