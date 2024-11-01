<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = ``;

const templateData = `
<template>
  <NmorphButton disabled>Disabled</NmorphButton>
  <NmorphButton disabled height="thin">Disabled thin</NmorphButton>
  <NmorphButton disabled loading />
</template>
`;
const cssData = ``;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.button.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-disabled-overview">
          <NmorphButton disabled>Disabled</NmorphButton>
          <NmorphButton disabled height="thin">Disabled thin</NmorphButton>
          <ClientOnly>
            <NmorphButton disabled loading />
          </ClientOnly>
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
.button-disabled-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
