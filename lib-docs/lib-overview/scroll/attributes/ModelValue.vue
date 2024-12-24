<script setup lang="ts">
import { NmorphSlider, NmorphScroll } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const elements = 30;
  const coords = ref({ x: 0, y: 0 });
  const scroll = ref<typeof NmorphScroll | null>(null);

  const updateSliderHandler = (value: number) => {
    if (scroll.value) scroll.value.moveTo({ x: 0, y: value });
  };
<\/script>
`;

const templateData = `
<template>
  <div class="slider">
    <NmorphSlider
      :show-tooltip="false"
      :model-value="coords.y"
      :min="0"
      :max="570"
      :step="10"
      @update:model-value="updateSliderHandler"
    />
    <div class="slider__value">{{ coords.y }}px</div>
  </div>
  <NmorphScroll
    height="300px"
    class="scroll"
    update-only-on-end
    v-model="coords"
    ref="scroll"
  >
    <div class="scroll__box-item" v-for="i in elements" :key="i">
      {{ i }}
    </div>
  </NmorphScroll>
</template>
`;

const cssData = `
<style lang="scss">
  .scroll-value-overview {
    width: 100%;

    .slider {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
    }

    .slider__value {
      padding: 0 24px 0 12px;
      font-weight: 600;
      width: 80px;
      text-align: right;
    }

    .scroll__box-item {
      background: var(--nmorph-accent-color);
      margin-bottom: 8px;
      color: var(--nmorph-focus-text-color);
    }

    .scroll {
      text-align: center;
      padding-right: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const elements = 30;
const coords = ref({ x: 0, y: 0 });
const scroll = ref<typeof NmorphScroll | null>(null);

const updateSliderHandler = (value: number) => {
  if (scroll.value) scroll.value.moveTo({ x: 0, y: value });
};
</script>

<template>
  <div id="content-value">
    <Attribute header="Model value" :subtitle="$t('overview.scroll.model-value.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="scroll-value-overview">
          <div class="slider">
            <NmorphSlider :show-tooltip="false" :model-value="coords.y" :min="0" :max="570" :step="10"
              @update:model-value="updateSliderHandler" />
            <div class="slider__value">{{ coords.y }}px</div>
          </div>
          <NmorphScroll height="300px" class="scroll" update-only-on-scroll-end v-model="coords" ref="scroll">
            <div class="scroll__box-item" v-for="i in elements" :key="i">
              {{ i }}
            </div>
          </NmorphScroll>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.scroll-value-overview {
  width: 100%;
  margin-left: 8px;

  .slider {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
  }

  .slider__value {
    padding: 0 24px 0 12px;
    font-weight: 600;
    width: 80px;
    text-align: right;
  }

  .scroll__box-item {
    background: var(--nmorph-accent-color);
    margin-bottom: 8px;
    color: var(--nmorph-focus-text-color);
  }

  .scroll {
    text-align: center;
    padding-right: 8px;
  }
}
</style>