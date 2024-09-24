<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<NmorphScroll height="300px" class="docs-scroll__scroll">
  <div class="docs-scroll__box" v-for="i in 20" :key="i">{{ i }}</div>
</NmorphScroll>
`;
const cssData = `
<style lang="scss">
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
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div class="attribute" id="content-height">
    <attribute
      header="Height"
      :subtitle="$t('overview.scroll.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="scroll-height-overview">
          <NmorphScroll height="300px" class="docs-scroll__scroll">
            <div class="docs-scroll__box" v-for="i in 20" :key="i">{{ i }}</div>
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
.scroll-height-overview {
  width: 100%;
  margin-left: 8px;

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
