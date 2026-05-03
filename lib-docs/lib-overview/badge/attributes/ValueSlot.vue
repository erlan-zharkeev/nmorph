<script setup lang="ts">
import { NmorphBadge, NmorphButton, NmorphIcon, NmorphIconUsers } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const teamSize = 12;

const scriptData = `
import { NmorphBadge, NmorphButton, NmorphIcon, NmorphIconUsers } from "@nmorph/nmorph-ui-kit";

const teamSize = 12;
`;

const templateData = `
<template>
  <NmorphBadge :value="teamSize" color="var(--nmorph-success-color)">
    <template #value="{ value }">
      <div class="badge-value-slot-overview__content">
        <NmorphIcon width="10px" height="10px" color="currentColor">
          <NmorphIconUsers />
        </NmorphIcon>
        <span>{{ value }}</span>
      </div>
    </template>
    <NmorphButton text="team" />
  </NmorphBadge>
</template>
`;

const cssData = `
.badge-value-slot-overview__content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-value-slot">
    <Attribute header="Value Slot" :subtitle="$t('overview.badge.value-slot.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="badge-value-slot-overview">
          <ClientOnly>
            <NmorphBadge :value="teamSize" color="var(--nmorph-success-color)">
              <template #value="{ value }">
                <div class="badge-value-slot-overview__content">
                  <NmorphIcon width="10px" height="10px" color="currentColor">
                    <NmorphIconUsers />
                  </NmorphIcon>
                  <span>{{ value }}</span>
                </div>
              </template>
              <NmorphButton text="team" />
            </NmorphBadge>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <CodeSlotData :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.badge-value-slot-overview {
  display: flex;
}

.badge-value-slot-overview__content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
