<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = ``;
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
    <attribute
      header="Ripple"
      :subtitle="$t('overview.button.ripple.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphButton style-type="default" ripple text="I am ripple" />
        <NmorphButton :ripple="false" text="I am not ripple" />
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
