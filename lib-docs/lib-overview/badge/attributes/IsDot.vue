<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge is-dot>
    <NmorphButton text="button" />
  </NmorphBadge>
</template>
`;
const cssData = `
<style lang="scss">
.badge-is-dot-overview {
  .nmorph-badge {
    --dot-size: 8px;
  }
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-is-dot">
    <Attribute header="Is Dot" :subtitle="$t('overview.badge.is-dot.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="badge-is-dot-overview">
          <ClientOnly>
            <NmorphBadge is-dot value="">
              <NmorphButton text="button" />
            </NmorphBadge>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.badge-is-dot-overview {
  .nmorph-badge {
    --dot-size: 8px;
  }
}
</style>
