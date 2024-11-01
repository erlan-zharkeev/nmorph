<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/attribute.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphLink icon-name="edit">Edit</NmorphLink>
  <NmorphLink icon-name="eye" underline text="Check" />
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
  <div id="content-icon-name">
    <attribute
      header="Icon name"
      :subtitle="$t('overview.link.icon-name.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="link-icon-name-overview">
          <NmorphLink icon-name="edit">Edit</NmorphLink>
          <NmorphLink icon-name="eye" underline text="Check" />
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
.link-icon-name-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
