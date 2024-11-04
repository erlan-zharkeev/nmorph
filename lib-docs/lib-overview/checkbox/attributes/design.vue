<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const value = ref(false);
<\/script>
`;

const templateData = `
<template>
  <NmorphCheckbox v-model="value" id="1" />
  <NmorphCheckbox
    v-model="value"
    id="2"
    design="button"
    :label="String(value)"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .checkbox-design-overview {
    .nmorph-checkbox {
      margin-right: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const value = ref(false);
</script>

<template>
  <div id="content-design">
    <attribute
      header="Design"
      :subtitle="$t('overview.checkbox.design.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="checkbox-design-overview">
          <ClientOnly>
            <NmorphCheckbox v-model="value" id="1" />
            <NmorphCheckbox
              v-model="value"
              id="2"
              design="button"
              :label="String(value)"
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
.checkbox-design-overview {
  .nmorph-checkbox {
    margin-right: 8px;
  }
}
</style>
