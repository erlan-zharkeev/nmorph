<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTable, NmorphTableColumn } from '@/components';
import { getMonthDaysByWeek } from './utils';
import NmorphCalendarHeader from './components/nmorph-calendar-header/NmorphCalendarHeader.vue';
import { NmorphTableDataType } from '../table/types';

// interface IProps {}
// const props = withDefaults(defineProps<IProps>(), {});
// const emit = defineEmits<IEmit>();
// interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-calendar': [],
  })
);

const propDaysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// const now = new Date();
const calendarMatrix = getMonthDaysByWeek(2025, 6);

const calendar = reactive<NmorphTableDataType>([]);

calendarMatrix.forEach((week) => {
  const weekData: Record<string, string> = {};
  week.forEach((day, dayIdx) => {
    const propName = propDaysOfWeek[dayIdx];
    weekData[propName] = String(day);
  });
  calendar.push(weekData);
});
</script>

<template>
  <div :class="modifiers">
    <NmorphCalendarHeader />
    <NmorphTable :data="calendar" bordered>
      <NmorphTableColumn prop="sun" label="Sun" />
      <NmorphTableColumn prop="mon" label="Mon" />
      <NmorphTableColumn prop="tue" label="Tue" />
      <NmorphTableColumn prop="wed" label="Wed" />
      <NmorphTableColumn prop="thu" label="Thu" />
      <NmorphTableColumn prop="fri" label="Fri" />
      <NmorphTableColumn prop="sat" label="Sat" />
    </NmorphTable>
  </div>
</template>

<style lang="scss">
// .nmorph-calendar
</style>
