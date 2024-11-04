<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <div class="badge-value-overview__element">
    <NmorphBadge :value="1" :offsetX="10" :offsetY="10">
      <NmorphButton text="button" />
    </NmorphBadge>
  </div>
  <div class="badge-value-overview__element">
    <NmorphBadge value="abc" :offsetX="-70" :offsetY="-35">
      <NmorphButton text="button" />
    </NmorphBadge>
  </div>
</template>
`;
const cssData = `
<style lang="scss">
.badge-offset-overview {
  display: flex;
  .badge-value-overview__element {
    margin-right: 24px;
  }
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-offset">
    <attribute
      header="Offset"
      :subtitle="$t('overview.badge.offset.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-offset-overview">
          <ClientOnly>
            <div class="badge-value-overview__element">
              <NmorphBadge :value="1" :offsetX="10" :offsetY="10">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge value="abc" :offsetX="-70" :offsetY="-35">
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
.badge-offset-overview {
  display: flex;
  .badge-value-overview__element {
    margin-right: 24px;
  }
}
</style>
