<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<NmorphLink disabled type="accent">Accent</NmorphLink>
<NmorphLink disabled type="success">Success</NmorphLink>
<NmorphLink disabled type="warning">Warning</NmorphLink>
<NmorphLink disabled type="error">Error</NmorphLink>
<NmorphLink disabled underline>Underlined</NmorphLink>
`;
const cssData = `
<style lang="scss">
.nmorph-link {
  margin: 0 8px;
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.link.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="link-disabled-overview">
          <NmorphLink disabled type="accent">Accent</NmorphLink>
          <NmorphLink disabled type="success">Success</NmorphLink>
          <NmorphLink disabled type="warning">Warning</NmorphLink>
          <NmorphLink disabled type="error">Error</NmorphLink>
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
.link-disabled-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
