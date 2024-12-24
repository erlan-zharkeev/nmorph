<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphLink>Without underline</NmorphLink>
  <NmorphLink underline>Underlined</NmorphLink>
</template>
`;

const cssData = `
<style lang="scss">
  .link-underline-overview {
    .nmorph-link {
      margin: 0 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-underline">
    <Attribute header="Underline" :subtitle="$t('overview.link.underline.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="link-underline-overview">
          <NmorphLink>{{ $t("overview.without-underline") }}</NmorphLink>
          <NmorphLink underline>{{ $t("overview.underlined") }}</NmorphLink>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.link-underline-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
