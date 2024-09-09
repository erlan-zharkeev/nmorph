<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
const scriptData = ``;
const templateData = `
<NmorphIcon name="loader" width="8%" height="8%" />
<NmorphIcon name="loader" width="23px" height="23px" />
<NmorphIcon name="loader" width="12px" height="12px" />
`;
const cssData = ``;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-width-height">
    <attribute
      header="Width/Height"
      :subtitle="$t('overview.icon.width-height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="icon-width-height-overview">
          <ClientOnly>
            <NmorphIcon name="loader" width="8%" height="8%" />
            <NmorphIcon name="loader" width="23px" height="23px" />
            <NmorphIcon name="loader" width="12px" height="12px" />
          </ClientOnly>
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
.icon-width-height-overview {
  display: flex;
  align-items: center;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
