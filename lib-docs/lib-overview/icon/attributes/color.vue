<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
const scriptData = ``;
const templateData = `
<NmorphIcon
  name="add-location"
  color="var(--nmorph-accent-color)"
  size="large"
/>
<NmorphIcon name="avatar" color="#694295" size="large" />
<NmorphIcon name="archive" color="hsl(148, 60%, 39%)" size="large" />
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
  <div id="content-color">
    <attribute
      header="Color"
      :subtitle="$t('overview.icon.color.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="icon-color-overview">
          <NmorphIcon
            name="add-location"
            color="var(--nmorph-accent-color)"
            size="large"
          />
          <NmorphIcon name="avatar" color="#694295" size="large" />
          <NmorphIcon name="archive" color="hsl(148, 60%, 39%)" size="large" />
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
.icon-color-overview {
  display: flex;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
