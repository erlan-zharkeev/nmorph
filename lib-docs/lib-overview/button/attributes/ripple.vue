<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = ``;
const templateData = `
<NmorphButton style-type="default" ripple text="I am ripple" />
<NmorphButton
  style-type="default"
  ripple
  accent-bg-on-hover
  text="I am ripple with hover bg"
/>
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
  <div id="content-ripple">
    <attribute
      header="Ripple"
      :subtitle="$t('overview.button.ripple.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-ripple-overview">
          <NmorphButton style-type="default" ripple text="I am ripple" />
          <NmorphButton
            style-type="default"
            ripple
            accent-bg-on-hover
            text="I am ripple with hover bg"
          />
          <NmorphButton :ripple="false" text="I am not ripple" />
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
.button-ripple-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
