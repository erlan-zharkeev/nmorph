<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<NmorphButton style-type="default">Default</NmorphButton>
<NmorphButton style-type="transparent">Transparent</NmorphButton>
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
  <div class="docs-button" id="content-style-type">
    <attribute
      header="Style type"
      :subtitle="$t('overview.button.styleType.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphButton style-type="default">Default</NmorphButton>
        <NmorphButton style-type="transparent">Transparent</NmorphButton>
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
.nmorph-button {
  margin: 0 8px;
}
</style>
