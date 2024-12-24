<script setup lang="ts">
import { NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const date = ref(new Date());
  const dates = ref([]);
  const date1 = new Date(1989, 11, 18);
  const date2 = new Date(1989, 11, 21);
  const range = ref([date1, date2]);
<\/setup>
`;

const templateData = `
<template>
  <div class="date-picker-basic-usage-overview__element">
    <NmorphDatePicker v-model="date" />
  </div>
  <div class="date-picker-basic-usage-overview__element">
    <NmorphDatePicker
      v-model="dates"
      type="dates"
      :initial-date="date"
    />
  </div>
  <div class="date-picker-basic-usage-overview__element">
    <NmorphDatePicker
      v-model="range"
      type="daterange"
      :initial-date="date1"
    />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .date-picker-basic-usage-overview {
    display: flex;
    flex-wrap: wrap;

    .date-picker-basic-usage-overview__element {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const date = ref(new Date());
const dates = ref([]);
const date1 = new Date(1989, 11, 18);
const date2 = new Date(1989, 11, 21);
const range = ref([date1, date2]);
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="date-picker-basic-usage-overview">
          <ClientOnly>
            <div class="date-picker-basic-usage-overview__element">
              <NmorphDatePicker v-model="date" />
            </div>
            <div class="date-picker-basic-usage-overview__element">
              <NmorphDatePicker v-model="dates" type="dates" :initial-date="date" />
            </div>
            <div class="date-picker-basic-usage-overview__element">
              <NmorphDatePicker v-model="range" type="daterange" :initial-date="date1" />
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.date-picker-basic-usage-overview {
  display: flex;
  flex-wrap: wrap;

  .date-picker-basic-usage-overview__element {
    margin-right: 12px;
    margin-bottom: 8px;
  }
}
</style>
