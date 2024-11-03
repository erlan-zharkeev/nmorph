<script setup lang="ts">
import { NmorphCalendar } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const date1 = new Date();
  const date2 = new Date();

  date2.setDate(date2.getDate() + 2);

  const range = ref([date1, date2]);
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

const range = ref([date1, date2]);
const model = ref(new Date());
</script>

<template>
  <div id="content-range">
    <attribute
      header="Range"
      :subtitle="$t('overview.calendar.range.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="calendar-initial-date-overview">
          <ClientOnly>
            <NmorphCalendar :range="range" v-model="model" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.calendar-range-overview {
}
</style>
