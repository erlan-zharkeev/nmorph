<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge is-tag value="beta" />
  <NmorphBadge is-tag color="var(--nmorph-success-color)" value="stable" />
  <NmorphBadge is-tag color="var(--nmorph-warn-color)" value="deprecated" />
</template>
`;

const cssData = `
<style lang="scss">
.badge-is-tag-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-is-tag">
    <Attribute header="Is Tag" :subtitle="$t('overview.badge.is-tag.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="badge-is-tag-overview">
          <ClientOnly>
            <NmorphBadge is-tag value="beta" />
            <NmorphBadge is-tag color="var(--nmorph-success-color)" value="stable" />
            <NmorphBadge is-tag color="var(--nmorph-warn-color)" value="deprecated" />
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
.badge-is-tag-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
