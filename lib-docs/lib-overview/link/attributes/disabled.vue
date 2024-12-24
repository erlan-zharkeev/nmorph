<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphLink disabled type="accent">Accent</NmorphLink>
  <NmorphLink disabled type="success">Success</NmorphLink>
  <NmorphLink disabled type="warning">Warning</NmorphLink>
  <NmorphLink disabled type="error">Error</NmorphLink>
  <NmorphLink disabled underline>Underlined</NmorphLink>
</template>
`;

const cssData = `
<style lang="scss">
  .link-disabled-overview {
    .nmorph-link {
      margin: 0 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.link.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="link-disabled-overview">
          <NmorphLink disabled type="accent">Accent</NmorphLink>
          <NmorphLink disabled type="success">Success</NmorphLink>
          <NmorphLink disabled type="warning">Warning</NmorphLink>
          <NmorphLink disabled type="error">Error</NmorphLink>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.link-disabled-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
