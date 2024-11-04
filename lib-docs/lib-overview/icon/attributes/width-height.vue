<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphIcon name="loader" width="33px" height="33px" />
  <NmorphIcon name="loader" width="23px" height="23px" />
  <NmorphIcon name="loader" width="12px" height="12px" />
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
    <attribute
      header="Width/Height"
      :subtitle="$t('overview.icon.width-height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="icon-width-height-overview">
          <ClientOnly>
            <NmorphIcon name="loader" width="33px" height="33px" />
            <NmorphIcon name="loader" width="23px" height="23px" />
            <NmorphIcon name="loader" width="12px" height="12px" />
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
.icon-width-height-overview {
  display: flex;
  align-items: center;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
