<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
const scriptData = ``;
const templateData = `
<NmorphButton height="thick">Thick</NmorphButton>
<NmorphButton height="default">Default</NmorphButton>
<NmorphButton height="thin">Thin</NmorphButton>
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
  <div id="content-height">
    <attribute
      header="Height"
      :subtitle="$t('overview.button.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-height-overview">
          <NmorphButton height="thick">Thick</NmorphButton>
          <NmorphButton height="default">Default</NmorphButton>
          <NmorphButton height="thin">Thin</NmorphButton>
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
.button-height-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
