<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphLink>Without underline</NmorphLink>
  <NmorphLink underline>Underlined</NmorphLink>
</template>
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
  <div id="content-underline">
    <attribute
      header="Underline"
      :subtitle="$t('overview.link.underline.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="link-underline-overview">
          <NmorphLink>Without underline</NmorphLink>
          <NmorphLink underline>Underlined</NmorphLink>
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
.link-underline-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
