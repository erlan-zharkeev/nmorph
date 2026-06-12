<script setup lang="ts">
import { NmorphButton, NmorphScroll } from "@nmorph/nmorph-ui-kit";

const elements = ref(10);
const addItem = () => (elements.value += 1);
const removeItem = () => (elements.value -= 1);
</script>

<template>
  <div class="scroll-max-height-overview">
    <div class="actions">
      <NmorphButton @click="addItem">Add</NmorphButton>
      <NmorphButton @click="removeItem">Remove</NmorphButton>
    </div>
    <NmorphScroll max-height="300px" class="docs-scroll__scroll">
      <div class="docs-scroll__box" v-for="i in elements" :key="i">
        {{ i }}
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.scroll-max-height-overview {
  display: flex;
  flex-direction: column;
  width: 100%;

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .docs-scroll__box {
    background: var(--nmorph-accent-color);
    margin-bottom: 8px;
    color: var(--nmorph-focus-text-color);
  }

  .docs-scroll__scroll {
    width: 100%;
    height: auto !important;
    text-align: center;
    padding-right: 8px;

    .nmorph-scroll__viewport {
      height: auto;
      max-height: 300px;
    }
  }
}
</style>
