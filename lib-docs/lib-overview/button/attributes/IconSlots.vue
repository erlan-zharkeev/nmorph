<script setup lang="ts">
import {
  NmorphButton,
  NmorphIconCheck,
  NmorphIconExit,
} from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphButton>
    <template #icon>
      <NmorphIconCheck />
    </template>
    Save
  </NmorphButton>

  <NmorphButton shape="circle">
    <template #icon-only>
      <NmorphIconExit />
    </template>
  </NmorphButton>
</template>
`;
const cssData = `
<style lang="scss">
  .button-icon-slots-overview {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-icon-slots">
    <Attribute header="Icon slots" :subtitle="$t('overview.button.icon-slots.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="button-icon-slots-overview">
          <NmorphButton>
            <template #icon>
              <NmorphIconCheck />
            </template>
            Save
          </NmorphButton>

          <NmorphButton shape="circle">
            <template #icon-only>
              <NmorphIconExit />
            </template>
          </NmorphButton>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.button-icon-slots-overview {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
