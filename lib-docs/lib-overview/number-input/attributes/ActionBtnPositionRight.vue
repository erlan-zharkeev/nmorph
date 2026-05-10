<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ActionBtnPositionRightExample from "./ActionBtnPositionRight.example.vue";
import actionBtnPositionRightSource from "./ActionBtnPositionRight.example.vue?raw";
</script>

<template>
  <div id="content-action-btn-position-right">
    <DocsExample
      header="Action-btn-position-right"
      :subtitle="$t('overview.number-input.action-btn-position-right.subtitle')"
      :component="ActionBtnPositionRightExample"
      :source="actionBtnPositionRightSource"
    />
  </div>
</template>
