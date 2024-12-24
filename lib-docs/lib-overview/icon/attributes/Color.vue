<script setup lang="ts">
import {
  NmorphIcon,
  NmorphIconAddLocation,
  NmorphIconAvatar,
  NmorphIconArchive,
} from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphIcon color="var(--nmorph-accent-color)" size="large">
    <NmorphIconAddLocation />
  </NmorphIcon>
  <NmorphIcon color="#694295" size="large"
    ><NmorphIconAvatar
  /></NmorphIcon>
  <NmorphIcon color="hsl(148, 60%, 39%)" size="large"
    ><NmorphIconArchive
  /></NmorphIcon>
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
    <Attribute header="Color" :subtitle="$t('overview.icon.color.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="icon-color-overview">
          <ClientOnly>
            <NmorphIcon color="var(--nmorph-accent-color)" size="large">
              <NmorphIconAddLocation />
            </NmorphIcon>
            <NmorphIcon color="#694295" size="large">
              <NmorphIconAvatar />
            </NmorphIcon>
            <NmorphIcon color="hsl(148, 60%, 39%)" size="large">
              <NmorphIconArchive />
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
.icon-color-overview {
  display: flex;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
