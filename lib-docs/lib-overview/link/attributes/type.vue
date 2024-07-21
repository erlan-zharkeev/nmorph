<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<NmorphLink type="accent">Accent</NmorphLink>
<NmorphLink type="success">Success</NmorphLink>
<NmorphLink type="warning">Warning</NmorphLink>
<NmorphLink type="error">Error</NmorphLink>
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
  <div class="docs-button" id="content-type">
    <attribute
      header="Type"
      :subtitle="$t('overview.link.type.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphLink type="accent">Accent</NmorphLink>
        <NmorphLink type="success">Success</NmorphLink>
        <NmorphLink type="warning">Warning</NmorphLink>
        <NmorphLink type="error">Error</NmorphLink>
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
.nmorph-link {
  margin: 0 8px;
}
</style>
