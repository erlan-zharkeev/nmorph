<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
import CodeBlock from "~/components/code-block/CodeBlock.vue";

const scriptData = `
<script setup lang="ts">
const loading = true
<\/script>
`;
const templateData = `
<NmorphButton style-type="default" loading />
<NmorphButton style-type="transparent" loading />
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
  <div class="docs-button" id="content-loading">
    <ComponentBlock
      header="Loading"
      :subtitle="$t('componentsOverview.loading.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphButton style-type="default" loading />
        <NmorphButton style-type="transparent" loading />
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
