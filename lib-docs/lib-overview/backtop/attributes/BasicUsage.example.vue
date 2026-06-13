<script setup lang="ts">
import { NmorphBacktop, NmorphScroll } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="backtop-basic-usage-overview">
    <NmorphScroll width="100%" height="260px">
      <ul class="backtop-basic-usage-overview__content">
        <li v-for="(_, idx) in Array.from({ length: 200 })" :key="idx">
          Scroll down
        </li>
      </ul>
      <NmorphBacktop
        design="plain"
        :right="24"
        :bottom="24"
        :visibility-height="80"
      />
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.backtop-basic-usage-overview {
  width: 100%;
}

.backtop-basic-usage-overview__content {
  display: grid;
  gap: 8px;
  min-height: 720px;
  margin: 0;
  padding: 12px 16px 64px;
  list-style: none;
}

.backtop-basic-usage-overview__content li {
  padding: 10px 12px;
  border-radius: 4px;
  background: var(--nmorph-main-color);
}
</style>
