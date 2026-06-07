<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="scroll-height-overview">
    <NmorphScroll height="300px" class="docs-scroll__scroll">
      <div class="docs-scroll__box" v-for="i in 20" :key="i">{{ i }}</div>
    </NmorphScroll>
    <div class="docs-scroll__parent nmorph--shadow-inset">
      <NmorphScroll height="100%" class="docs-scroll__scroll">
        <div class="docs-scroll__box" v-for="i in 20" :key="`full-${i}`">
          {{ i }}
        </div>
      </NmorphScroll>
    </div>
  </div>
</template>

<style lang="scss">
.scroll-height-overview {
  width: 100%;
  display: grid;
  gap: 16px;

  .docs-scroll__box {
    background: var(--nmorph-accent-color);
    margin-bottom: 8px;
    color: var(--nmorph-focus-text-color);
  }

  .docs-scroll__parent {
    height: 300px;
    padding: 8px;
    box-sizing: border-box;
  }

  .docs-scroll__scroll {
    width: 100%;
    text-align: center;
    padding-right: 8px;
  }
}
</style>
