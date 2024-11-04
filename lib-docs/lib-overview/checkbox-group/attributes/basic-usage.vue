<script setup lang="ts">
import { NmorphCheckboxGroup } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const options = [
    { id: "1", disabled: true, label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
  ];

  const value = ref(["2"]);
<\/script>
`;

const templateData = `
<template>
  <NmorphCheckboxGroup
    v-model="value"
    :options="options"
    direction="column"
  />
  <NmorphCheckboxGroup
    v-model="value"
    :options="options"
    direction="row"
    design="button"
  />
</template>
`;
const cssData = `
<style lang="scss">
  .checkbox-group-model-value-overview {
    .nmorph-checkbox-group {
      margin-right: 24px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
const options = [
  { id: "1", disabled: true, label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];

const value = ref(["2"]);
</script>

<template>
  <div id="content-model-value">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="checkbox-group-model-value-overview">
          <ClientOnly>
            <NmorphCheckboxGroup
              v-model="value"
              :options="options"
              direction="column"
            />
            <NmorphCheckboxGroup
              v-model="value"
              :options="options"
              direction="row"
              design="button"
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
.checkbox-group-model-value-overview {
  .nmorph-checkbox-group {
    margin-right: 24px;
  }
}
</style>
