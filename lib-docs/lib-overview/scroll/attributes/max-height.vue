<script setup lang="ts">
import { NmorphButton, NmorphScroll } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
const elements = ref(10);
const addItem = () => (elements.value += 1);
const removeItem = () => (elements.value -= 1);
</\script>
`;

const templateData = `
<template>
  <div class="actions">
    <NmorphButton @click="addItem">Add</NmorphButton>
    <NmorphButton @click="removeItem">Remove</NmorphButton>
  </div>
  <NmorphScroll max-height="300px" class="docs-scroll__scroll">
    <div class="docs-scroll__box" v-for="i in elements" :key="i">
      {{ i }}
    </div>
  </NmorphScroll>
</template>
`;
const cssData = `
<style lang="scss">
  .scroll-max-height-overview {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 8px;

    .nmorph-button {
      margin-right: 8px;
    }

    .actions {
      margin-bottom: 12px;
    }

    .docs-scroll__box {
      background: var(--nmorph-accent-color);
      margin-bottom: 8px;
      color: var(--nmorph-focus-text-color);
    }

    .docs-scroll__scroll {
      width: 100%;
      text-align: center;
      padding-right: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const elements = ref(10);
const addItem = () => (elements.value += 1);
const removeItem = () => (elements.value -= 1);
</script>

<template>
  <div id="content-max-height">
    <attribute
      header="Max height"
      :subtitle="$t('overview.scroll.max-height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="scroll-max-height-overview">
          <div class="actions">
            <NmorphButton @click="addItem">{{
              $t("overview.add")
            }}</NmorphButton>
            <NmorphButton @click="removeItem">{{
              $t("overview.remove")
            }}</NmorphButton>
          </div>
          <NmorphScroll max-height="300px" class="docs-scroll__scroll">
            <div class="docs-scroll__box" v-for="i in elements" :key="i">
              {{ i }}
            </div>
          </NmorphScroll>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.scroll-max-height-overview {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 8px;

  .nmorph-button {
    margin-right: 8px;
  }

  .actions {
    margin-bottom: 12px;
  }

  .docs-scroll__box {
    background: var(--nmorph-accent-color);
    margin-bottom: 8px;
    color: var(--nmorph-focus-text-color);
  }

  .docs-scroll__scroll {
    width: 100%;
    text-align: center;
    padding-right: 8px;
  }
}
</style>
