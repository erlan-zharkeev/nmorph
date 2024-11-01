<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = ``;

const templateData = `
<template>
  <NmorphButton>Default</NmorphButton>
  <NmorphButton shape="circle" class="custom-circle-button">Circle</NmorphButton>
  <NmorphButton shape="round">Round</NmorphButton>
  <NmorphButton shape="square" class="custom-square-button">Square</NmorphButton>
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-shape">
    <attribute
      info-name="button.shape"
      header="Shape"
      :subtitle="$t('overview.button.shape.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-shape-overview">
          <NmorphButton>Default</NmorphButton>
          <NmorphButton shape="circle" class="custom-circle-button"
            >Circle</NmorphButton
          >
          <NmorphButton shape="round">Round</NmorphButton>
          <NmorphButton shape="square" class="custom-square-button"
            >Square</NmorphButton
          >
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
.button-shape-overview {
  .nmorph-button {
    margin: 0 8px;
  }

  .custom-circle-button {
    --height: 50px;
  }

  .custom-square-button {
    --height: 70px;
  }
}
</style>
