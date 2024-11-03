<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphScroll class="scroll" ref="scroll">
    <div class="scroll__box-item" v-for="i in 20" :key="i">
      {{ i }}
    </div>
  </NmorphScroll>
</template>
`;
const cssData = `
<style lang="scss">
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
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-horizontal-scroll">
    <attribute
      header="Horizontal scroll"
      :subtitle="$t('overview.scroll.horizontal-scroll.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="horizontal-scroll-overview">
          <NmorphScroll class="scroll" ref="scroll">
            <div class="scroll__box-item" v-for="i in 20" :key="i">
              {{ i }}
            </div>
          </NmorphScroll>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.horizontal-scroll-overview {
  width: 100%;
  margin-left: 8px;

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
