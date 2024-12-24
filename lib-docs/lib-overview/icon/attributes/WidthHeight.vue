<script setup lang="ts">
import { NmorphIcon, NmorphIconLoader } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphIcon width="33px" height="33px">
    <NmorphIconLoader/>
  </NmorphIcon>
  <NmorphIcon width="23px" height="23px">
    <NmorphIconLoader/>
  </NmorphIcon>
  <NmorphIcon width="12px" height="12px">
    <NmorphIconLoader/>
  </NmorphIcon>
</template>
`;
const cssData = `
<style lang="scss">
  .icon-width-height-overview {
    display: flex;
    align-items: center;

    .nmorph-icon {
      margin: 0 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-width-height">
    <Attribute header="Width/Height" :subtitle="$t('overview.icon.width-height.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="icon-width-height-overview">
          <ClientOnly>
            <NmorphIcon width="33px" height="33px">
              <NmorphIconLoader />
            </NmorphIcon>
            <NmorphIcon width="23px" height="23px">
              <NmorphIconLoader />
            </NmorphIcon>
            <NmorphIcon width="12px" height="12px">
              <NmorphIconLoader />
            </NmorphIcon>
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
.icon-width-height-overview {
  display: flex;
  align-items: center;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
