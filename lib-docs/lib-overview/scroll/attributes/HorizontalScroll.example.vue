<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="horizontal-scroll-overview">
    <NmorphScroll class="scroll" ref="scroll">
      <div class="scroll__box-item" v-for="i in 20" :key="i">
        {{ i }}
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.horizontal-scroll-overview {
  width: 100%;

  .scroll__box-item {
    background: var(--nmorph-accent-color);
    color: var(--nmorph-focus-text-color);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
  }

  .scroll {
    width: 99%;
    display: flex;
    text-align: center;
  }
}
</style>
