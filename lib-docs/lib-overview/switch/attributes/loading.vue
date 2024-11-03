<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphSwitch loading disabled />
</template>
`;

const cssData = `
<style lang="scss">
  .switch-loading-overview {
    .nmorph-switch {
      --height: 24px;
      --thumb-height: 18px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-loading">
    <attribute
      header="Loading"
      :subtitle="$t('overview.switch.loading.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="switch-loading-overview">
          <ClientOnly>
            <NmorphSwitch loading disabled />
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
.switch-loading-overview {
  .nmorph-switch {
    --height: 24px;
    --thumb-height: 18px;
  }
}
</style>
