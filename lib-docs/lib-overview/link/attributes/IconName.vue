<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphLink icon-name="edit">Edit</NmorphLink>
  <NmorphLink icon-name="eye" underline text="Check" />
</template>
`;
const cssData = `
<style lang="scss">
  .link-icon-name-overview {
    .nmorph-link {
      margin: 0 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-icon-name">
    <Attribute header="Icon name" :subtitle="$t('overview.link.icon-name.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="link-icon-name-overview">
          <NmorphLink icon-name="edit">{{ $t("overview.edit") }}</NmorphLink>
          <NmorphLink icon-name="eye" underline text="Lorem ipsum" />
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.link-icon-name-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
