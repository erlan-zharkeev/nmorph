<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
const scriptData = ``;
const templateData = `
<NmorphIcon name="loader" width="8%" height="8%" />
<NmorphIcon name="loader" width="23px" height="23px" />
<NmorphIcon name="loader" width="12px" height="12px" />
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
  <div class="docs-button" id="content-color">
    <attribute
      header="Color"
      :subtitle="$t('overview.icon.color.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <NmorphIcon
          name="add-location"
          color="--nmorph-accent-color"
          size="large"
        />
        <NmorphIcon name="avatar" color="red" size="large" />
        <NmorphIcon name="archive" color="orange" size="large" />
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
