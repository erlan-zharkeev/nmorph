<script setup lang="ts">
import { NmorphDivider, NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="divider-direction-overview">
    <div class="divider-wrapper">
      <div class="divider-horizontal">
        <div class="horizontal-elements">
          <div
            class="element"
            v-for="(_, idx) in Array.from({ length: 4 })"
            :key="idx"
          >
            <NmorphCard :paper="3">Lorem ipsum</NmorphCard>
          </div>
        </div>
        <NmorphDivider />
        <div class="horizontal-elements">
          <div
            class="element"
            v-for="(_, idx) in Array.from({ length: 4 })"
            :key="idx"
          >
            <NmorphCard :paper="3">Lorem ipsum</NmorphCard>
          </div>
        </div>
      </div>
      <div class="divider-vertical">
        <div class="vertical-elements">
          <div
            class="element"
            v-for="(_, idx) in Array.from({ length: 4 })"
            :key="idx"
          >
            <NmorphCard :paper="3">Lorem ipsum</NmorphCard>
          </div>
        </div>
        <NmorphDivider direction="vertical" />
        <div class="vertical-elements">
          <div
            class="element"
            v-for="(_, idx) in Array.from({ length: 4 })"
            :key="idx"
          >
            <NmorphCard :paper="3">Lorem ipsum</NmorphCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.divider-direction-overview {
  .divider-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .divider-horizontal {
    margin-right: 24px;
    margin-bottom: 8px;

    .nmorph-divider {
      margin: 16px 0;
    }
  }

  .divider-vertical {
    display: flex;
    gap: 16px;

    .nmorph-divider {
      margin: 0;
    }
  }

  .horizontal-elements {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
  }

  .vertical-elements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  }
}
</style>
