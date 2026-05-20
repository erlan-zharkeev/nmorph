<script setup lang="ts">
import { NmorphBacktop, NmorphScroll } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="backtop-basic-usage-overview">
    <ClientOnly>
      <NmorphScroll width="100%">
        <div class="content">
          <li v-for="(_, idx) in Array.from({ length: 200 })" :key="idx">
            Scroll down
          </li>
        </div>
        <NmorphBacktop design="common" />
      </NmorphScroll>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.backtop-basic-usage-overview {
  width: 100%;
}
</style>
