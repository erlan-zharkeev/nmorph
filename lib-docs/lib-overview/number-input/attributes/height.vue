<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphNumberInput height="thick" />
  <NmorphNumberInput height="default" />
  <NmorphNumberInput height="thin" />
</template>
`;
const cssData = `
<style lang="scss">
  .number-input-height-overview {
    display: flex;
    align-items: center;
    .nmorph-number-input {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-height">
    <attribute
      header="Height"
      :subtitle="$t('overview.number-input.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="number-input-height-overview">
          <ClientOnly>
            <NmorphNumberInput height="thick" />
            <NmorphNumberInput height="default" />
            <NmorphNumberInput height="thin" />
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
.number-input-height-overview {
  display: flex;
  align-items: center;
  .nmorph-number-input {
    margin-right: 8px;
  }
}
</style>
