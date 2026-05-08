<script setup lang="ts">
import { NmorphCalendar } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const date1 = new Date();
  const date2 = new Date();

  date2.setDate(date2.getDate() + 2);

  const range = ref<[Date, Date]>([date1, date2]);
  const model = ref(new Date());
<\/script>
`;

const templateData = `
<template>
  <NmorphCalendar :range="range" v-model="model" />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const date1 = new Date();
const date2 = new Date();

date2.setDate(date2.getDate() + 2);

const range = ref<[Date, Date]>([date1, date2]);
const model = ref(new Date());
</script>

<template>
  <div id="content-range">
    <Attribute header="Range" :subtitle="$t('overview.calendar.range.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="calendar-initial-date-overview">
          <ClientOnly>
            <NmorphCalendar :range="range" v-model="model" />
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
.calendar-range-overview {}
</style>
