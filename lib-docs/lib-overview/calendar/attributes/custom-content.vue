<script setup lang="ts">
import { NmorphCalendar } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const date = ref(new Date());
<\/script>
`;

const templateData = `
<template>
  <div class="calendar-custom-content-overview">
    <NmorphCalendar :initial-date="new Date()" v-model="date">
      <template #date-cell="{ scope }">
        {{ scope.isToday ? "TODAY" : scope.value }}
      </template>
    </NmorphCalendar>
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .calendar-custom-content-overview {
    width: 100%;
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const date = ref(new Date());
</script>

<template>
  <div id="content-custom-content">
    <attribute header="Custom content" :codeToCopy="code">
      <template #overview>
        <div class="calendar-custom-content-overview">
          <ClientOnly>
            <NmorphCalendar :initial-date="new Date()" v-model="date">
              <template #date-cell="{ scope }">
                {{ scope.isToday ? "!TODAY!" : scope.value }}
              </template>
            </NmorphCalendar>
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
.calendar-custom-content-overview {
  width: 100%;
}
</style>
