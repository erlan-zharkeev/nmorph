<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge is-dot color="red">
    <NmorphButton text="button" />
  </NmorphBadge>
  <NmorphBadge color="green" value="abc">
    <NmorphButton text="button" />
  </NmorphBadge>
  <NmorphBadge color="var(--nmorph-warn-color)" :value="1">
    <NmorphButton text="button" />
  </NmorphBadge>
</template>
`;

const cssData = `
<style lang="scss">
.badge-color-overview {
  display: flex;
  .badge-value-overview__element {
    margin-right: 30px;
  }
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-color">
    <Attribute header="Color" :subtitle="$t('overview.badge.color.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="badge-color-overview">
          <ClientOnly>
            <div class="badge-value-overview__element">
              <NmorphBadge is-dot color="red">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge color="green" value="abc">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge color="var(--nmorph-warn-color)" :value="1">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
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
.badge-color-overview {
  display: flex;

  .badge-value-overview__element {
    margin-right: 30px;
  }
}
</style>
