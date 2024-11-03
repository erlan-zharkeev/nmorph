<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphButton style-type="default">Default</NmorphButton>
  <NmorphButton style-type="transparent">Transparent</NmorphButton>
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
    <attribute
      header="Style type"
      :subtitle="$t('overview.button.style-type.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-type-overview">
          <NmorphButton style-type="default">{{
            $t("overview.default")
          }}</NmorphButton>
          <NmorphButton style-type="transparent">{{
            $t("overview.transparent")
          }}</NmorphButton>
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
.button-type-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
