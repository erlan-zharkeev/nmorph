<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
const scriptData = ``;
const templateData = `
<NmorphIcon size="large" name="eye" />
<NmorphIcon size="medium" name="eye" />
<NmorphIcon size="small" name="eye" />
`;
const cssData = `
<style lang="scss">
.nmorph-icon {
  margin: 0 8px;
}
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div class="docs-icon" id="content-size">
    <attribute
      header="Size"
      :subtitle="$t('overview.icon.size.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphIcon size="large" name="eye" />
        <NmorphIcon size="medium" name="eye" />
        <NmorphIcon size="small" name="eye" />
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

<style lang="scss" scoped>
.nmorph-icon {
  margin: 0 8px;
}

::v-deep(.docs-component__overview) {
  align-items: center;
}
</style>
