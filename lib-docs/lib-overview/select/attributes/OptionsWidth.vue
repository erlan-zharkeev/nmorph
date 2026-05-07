<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
const value = ref("teams");

const options = [
  { value: "teams", label: "Microsoft Teams Audio Device (Virtual)" },
  { value: "microphone", label: "MacBook Pro Microphone (Built-in)" },
  { value: "thunderbolt", label: "Universal Audio Thunderbolt (PCI)" },
];
<\/script>
`;

const templateData = `
<template>
  <NmorphSelect v-model="value" :options="options" />
  <NmorphSelect v-model="value" :options="options" options-width="auto" />
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];

const value = ref("teams");
const options = [
  { value: "teams", label: "Microsoft Teams Audio Device (Virtual)" },
  { value: "microphone", label: "MacBook Pro Microphone (Built-in)" },
  { value: "thunderbolt", label: "Universal Audio Thunderbolt (PCI)" },
];
</script>

<template>
  <div id="content-options-width">
    <Attribute header="Options width" :subtitle="$t('overview.select.options-width.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-options-width-overview">
          <ClientOnly>
            <NmorphSelect v-model="value" :options="options" />
            <NmorphSelect v-model="value" :options="options" options-width="auto" />
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
.select-options-width-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
