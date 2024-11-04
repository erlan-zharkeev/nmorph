<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";
const templateData = `
<template>
  <div class="badge-value-overview__element">
    <NmorphBadge value="abc">
      <NmorphButton text="button" />
    </NmorphBadge>
  </div>
  <div class="badge-value-overview__element">
    <NmorphBadge :value="99">
      <NmorphButton text="button" />
    </NmorphBadge>
  </div>
</template>
`;
const cssData = `
.badge-value-overview {
  display: flex;

  .badge-value-overview__element {
    margin-right: 24px;
  }
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-value">
    <attribute
      header="Value"
      :subtitle="$t('overview.badge.value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-value-overview">
          <ClientOnly>
            <div class="badge-value-overview__element">
              <NmorphBadge value="abc">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge :value="99">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.badge-value-overview {
  display: flex;

  .badge-value-overview__element {
    margin-right: 24px;
  }
}
</style>
