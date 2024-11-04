<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphIcon size="large" name="eye" />
  <NmorphIcon size="medium" name="eye" />
  <NmorphIcon size="small" name="eye" />
</template>
`;
const cssData = `
<style lang="scss">
  .icon-size-overview {
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
  <div id="content-size">
    <attribute
      header="Size"
      :subtitle="$t('overview.icon.size.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="icon-size-overview">
          <ClientOnly>
            <NmorphIcon size="large" name="eye" />
            <NmorphIcon size="medium" name="eye" />
            <NmorphIcon size="small" name="eye" />
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
.icon-size-overview {
  display: flex;
  align-items: center;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
