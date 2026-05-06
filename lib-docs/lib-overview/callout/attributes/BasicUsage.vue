<script setup lang="ts">
import { NmorphCallout } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const templateData = `
<template>
  <NmorphCallout title="Information" content="Useful content for the reader." />
  <NmorphCallout type="warning" title="Attention" content="Important content for the reader." />
</template>
`;

const scriptData = ``;
const cssData = `
<style lang="scss">
  .callout-basic-usage-overview {
    display: grid;
    width: 100%;
    gap: 12px;
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="callout-basic-usage-overview">
          <NmorphCallout :title="$t('overview.callout.basic-usage.info-title')" :content="$t('overview.callout.basic-usage.info-content')" />
          <NmorphCallout
            type="warning"
            :title="$t('overview.callout.basic-usage.warning-title')"
            :content="$t('overview.callout.basic-usage.warning-content')"
          />
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.callout-basic-usage-overview {
  display: grid;
  width: 100%;
  gap: 12px;
}
</style>
