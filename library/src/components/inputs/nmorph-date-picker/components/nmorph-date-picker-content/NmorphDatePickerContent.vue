<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCalendar } from '@/components';
import NmorphDatePickerHeader from './../nmorph-date-picker-header/NmorphDatePickerHeader.vue';
import NmorphYearMonthPicker from './../nmorph-year-month-picker/NmorphYearMonthPicker.vue';
import { NmorphInnerPickerType, NmorphSelectionDateType } from '../types';
import { NmorphDate, NmorphSelectedDateModel } from '@/components/nmorph-calendar/types';

interface IProps {
  initialDate?: Date;
  selectedValues: NmorphSelectedDateModel;
  type?: keyof typeof NmorphSelectionDateType;
}

const props = withDefaults(defineProps<IProps>(), {
  initialDate: () => new Date(),
  type: 'date',
});

const emit = defineEmits<IEmit>();
interface IEmit {
  (e: 'update-selected-value', selectedValue: NmorphDate): void;
}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-date-picker-content': [],
  })
);

const initialDate = ref(props.initialDate);

const selectedPicker = ref<NmorphInnerPickerType>('calendar');

const prevMonth = computed(() => new Date(initialDate.value.setMonth(initialDate.value.getMonth() - 1)));
const nextMonth = computed(() => new Date(initialDate.value.setMonth(initialDate.value.getMonth() + 1)));
const prevYear = computed(() => new Date(initialDate.value.setFullYear(initialDate.value.getFullYear() - 1)));
const nextYear = computed(() => new Date(initialDate.value.setFullYear(initialDate.value.getFullYear() + 1)));

const prevMonthHandler = () => {
  initialDate.value = prevMonth.value;
};
const nextMonthHandler = () => {
  initialDate.value = nextMonth.value;
};
const prevYearHandler = () => {
  initialDate.value = prevYear.value;
};
const nextYearHandler = () => {
  initialDate.value = nextYear.value;
};
const changeYearHandler = () => {
  selectedPicker.value = 'year';
};
const changeMonthHandler = () => {
  selectedPicker.value = 'month';
};
const updateYearHandler = (year: string) => {
  const updateDate = new Date(initialDate.value.setFullYear(Number(year)));
  initialDate.value = updateDate;
  selectedPicker.value = 'month';
};
const updateMonthHandler = (month: string) => {
  const updateDate = new Date(initialDate.value.setMonth(Number(month)));
  initialDate.value = updateDate;
  selectedPicker.value = 'calendar';
};
const backToYearsHandler = () => {
  selectedPicker.value = 'year';
};

const updateSelectedDate = (value: NmorphDate) => {
  emit('update-selected-value', value);
};
</script>

<template>
  <div :class="modifiers">
    <NmorphCalendar
      v-if="selectedPicker === 'calendar'"
      :type="props.type"
      :selected-values="props.selectedValues"
      :initial-date="initialDate"
      @update:model-value="updateSelectedDate"
    >
      <template #header
        ><NmorphDatePickerHeader
          :date="initialDate"
          @prev-month="prevMonthHandler"
          @next-month="nextMonthHandler"
          @prev-year="prevYearHandler"
          @next-year="nextYearHandler"
          @change-year="changeYearHandler"
          @change-month="changeMonthHandler"
      /></template>
    </NmorphCalendar>
    <NmorphYearMonthPicker
      v-if="selectedPicker === 'year'"
      type="year"
      :current-date="initialDate"
      @update-year="updateYearHandler"
    />
    <NmorphYearMonthPicker
      v-if="selectedPicker === 'month'"
      type="month"
      :current-date="initialDate"
      @update-year="updateYearHandler"
      @update-month="updateMonthHandler"
      @back-to-years="backToYearsHandler"
    />
  </div>
</template>

<style lang="scss"></style>
