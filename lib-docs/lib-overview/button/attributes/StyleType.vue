<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphButton style-type="default">Default</NmorphButton>
  <NmorphButton style-type="transparent">Transparent</NmorphButton>
  <NmorphButton style-type="transparent" color="var(--nmorph-accent-color)">Accent</NmorphButton>
</template>
`;
const cssData = `
<style lang="scss">
  .button-type-overview {
    .nmorph-button {
      margin: 0 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-style-type">
    <Attribute header="Style type" :subtitle="$t('overview.button.style-type.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="button-type-overview">
          <NmorphButton style-type="default">{{
            $t("overview.default")
            }}</NmorphButton>
          <NmorphButton style-type="transparent">{{
            $t("overview.transparent")
            }}</NmorphButton>
          <NmorphButton style-type="transparent" color="var(--nmorph-accent-color)">{{
            $t("overview.edit")
            }}</NmorphButton>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.button-type-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
