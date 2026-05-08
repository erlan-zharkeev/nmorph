<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphButton height="thick">Thick</NmorphButton>
  <NmorphButton height="basic">Basic</NmorphButton>
  <NmorphButton height="thin">Thin</NmorphButton>
</template>
`;
const cssData = `
<style lang="scss">
  .button-height-overview {
    .nmorph-button {
      margin: 4px 8px;
    }
  }
</style>

`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-height">
    <Attribute header="Height" :subtitle="$t('overview.button.height.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="button-height-overview">
          <NmorphButton height="thick">{{ $t("overview.thick") }}</NmorphButton>
          <NmorphButton height="basic">{{ $t("overview.basic") }}</NmorphButton>
          <NmorphButton height="thin">{{ $t("overview.thin") }}</NmorphButton>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.button-height-overview {
  .nmorph-button {
    margin: 4px 8px;
  }
}
</style>
