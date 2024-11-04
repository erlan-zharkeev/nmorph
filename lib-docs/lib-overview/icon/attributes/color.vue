<script setup lang="ts">
import { NmorphIcon } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphIcon
    name="add-location"
    color="var(--nmorph-accent-color)"
    size="large"
  />
  <NmorphIcon name="avatar" color="#694295" size="large" />
  <NmorphIcon name="archive" color="hsl(148, 60%, 39%)" size="large" />
</template>
`;
const cssData = `
<style lang="scss">
  .icon-color-overview {
    display: flex;

    .nmorph-icon {
      margin: 0 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-color">
    <attribute
      header="Color"
      :subtitle="$t('overview.icon.color.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="icon-color-overview">
          <ClientOnly>
            <NmorphIcon
              name="add-location"
              color="var(--nmorph-accent-color)"
              size="large"
            />
            <NmorphIcon name="avatar" color="#694295" size="large" />
            <NmorphIcon
              name="archive"
              color="hsl(148, 60%, 39%)"
              size="large"
            />
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
.icon-color-overview {
  display: flex;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
