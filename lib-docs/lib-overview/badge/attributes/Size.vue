<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge is-tag value="tiny" size="tiny" />
  <NmorphBadge is-tag value="extra-small" size="extra-small" />
  <NmorphBadge is-tag value="base" size="base" />
</template>
`;

const cssData = `
<style lang="scss">
.badge-size-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-size">
    <Attribute header="Size" :subtitle="$t('overview.badge.size.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="badge-size-overview">
          <ClientOnly>
            <NmorphBadge is-tag value="tiny" size="tiny" />
            <NmorphBadge is-tag value="extra-small" size="extra-small" />
            <NmorphBadge is-tag value="base" size="base" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.badge-size-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
