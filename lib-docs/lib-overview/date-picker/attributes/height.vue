<script setup lang="ts">
import { NmorphComponentHeight, NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const value = ref(new Date());
<\/script>
`;

const templateData = `
<template>
  <NmorphDatePicker
    height="thick"
    :height="height"
    v-model="value"
  />
  <NmorphDatePicker
    height="default"
    :height="height"
    v-model="value"
  />
  <NmorphDatePicker
    height="thin"
    :height="height"
    v-model="value"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .date-picker-height-overview {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .nmorph-date-picker {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const value = ref(new Date());
</script>

<template>
  <div id="content-height">
    <attribute
      header="Height"
      :subtitle="$t('overview.date-picker.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="date-picker-height-overview">
          <ClientOnly>
            <NmorphDatePicker
              v-for="height in Object.keys(NmorphComponentHeight)"
              :key="height"
              :height="height"
              v-model="value"
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
.date-picker-height-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .nmorph-date-picker {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
