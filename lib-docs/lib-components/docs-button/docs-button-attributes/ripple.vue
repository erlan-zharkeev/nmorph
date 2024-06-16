<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
import CodeBlock from "~/components/code-block/CodeBlock.vue";

const scriptData = `
<script setup lang="ts">
<\/script>
`;
const templateData = `
<NmorphButton ripple text="I am ripple" />
<NmorphButton :ripple="false" text="I am not ripple" />
`;
const cssData = `
<style lang="scss">
.nmorph-button {
  margin: 0 8px;
}
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div class="docs-button" id="content-ripple">
    <ComponentBlock
      header="Ripple"
      :subtitle="$t('componentsOverview.ripple.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphButton style-type="default" ripple text="I am ripple" />
        <NmorphButton :ripple="false" text="I am not ripple" />
      </template>
      <template #code>
        <CodeBlock v-if="templateData" lang="html">{{
          templateData
        }}</CodeBlock>
        <CodeBlock v-if="scriptData" lang="javascript">{{
          scriptData
        }}</CodeBlock>
        <CodeBlock v-if="cssData" lang="css">{{ cssData }}</CodeBlock>
      </template>
    </ComponentBlock>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  margin: 0 8px;
}
</style>
