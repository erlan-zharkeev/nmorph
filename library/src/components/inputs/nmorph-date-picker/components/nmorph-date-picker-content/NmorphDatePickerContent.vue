<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCalendar } from '@/components';
import NmorphDatePickerHeader from './../nmorph-date-picker-header/NmorphDatePickerHeader.vue';
import NmorphYearMonthPicker from './../nmorph-year-month-picker/NmorphYearMonthPicker.vue';

interface IProps {}
const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmit>();

interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-date-picker-content': [],
  })
);
</script>
<template>
  <div :class="modifiers">
    <NmorphCalendar
      v-if="selectedPicker === 'calendar'"
      v-model="initialSelectedDate"
      :initial-date="initialDate"
      :single-selected-value="singleSelectedValue"
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
