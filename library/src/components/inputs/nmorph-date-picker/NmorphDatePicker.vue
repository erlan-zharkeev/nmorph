<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCommonInputProps, NmorphComponentHeight, NmorphDomElement } from '@/types/common';
import { NmorphCalendar, NmorphDropdown, NmorphIcon, NmorphYearMonthPicker } from '@/components';
import NmorphDatePickerHeader from './components/nmorph-date-picker-header/NmorphDatePickerHeader.vue';
import { formatDateIntl } from '@/components/nmorph-calendar/utils';
import { NmorphDatePickerType } from './components/types';

type PickerType = 'calendar' | 'year' | 'month';

interface IProps extends Omit<NmorphCommonInputProps, 'fill'> {
  placeholder: string;
  initialDate?: Date;
  modelValue: Date[];
  type?: keyof typeof NmorphDatePickerType;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  height: 'default',
  placeholder: 'Pick a date',
  initialDate: () => new Date(),
  modelValue: () => [],
  type: 'date',
});

const initialDate = ref(props.initialDate);
const initialSelectedDate = ref(props.modelValue);

const selectedPicker = ref<PickerType>('calendar');

const emit = defineEmits<IEmit>();
interface IEmit {
  (e: 'update:modelValue', modelValue: Date[]): void;
}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-date-picker': [`${props.disabled && 'disabled'}`],
  })
);

const open = ref(false);
const nmorphInputDOMRef = ref<NmorphDomElement>(null);

const closeHandler = () => {
  open.value = false;
};
const toggleOpen = () => {
  open.value = !open.value;
};

const value = computed(() => (props.modelValue ? formatDateIntl(props.modelValue[0]) : props.placeholder));

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

watch(initialSelectedDate, () => {
  emit('update:modelValue', initialSelectedDate.value);
});

const singleSelectedValue = computed(() => {
  return props.type === 'date';
});
</script>

<template>
  <div :class="modifiers">
    <div
      ref="nmorphInputDOMRef"
      class="nmorph-date-picker__input"
      :class="{ 'nmorph-date-picker__input--open': open }"
      @click="toggleOpen"
    >
      <input type="date" />
      <NmorphIcon name="calendar" class="nmorph-date-picker__calendar-icon" />
      <span>{{ value }}</span>
    </div>
    <div class="nmorph-date-picker__content">
      <NmorphDropdown
        v-if="nmorphInputDOMRef"
        :fill-width="false"
        :width="324"
        :open="open"
        :relative-element="nmorphInputDOMRef"
        @on-outside-click="closeHandler"
      >
        <!-- <NmorphCalendar
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
        /> -->
      </NmorphDropdown>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-date-picker {
  --width: 200px;
  .nmorph-date-picker__input {
    height: 100%;
    display: flex;
    align-items: center;
    width: var(--width);
    // TODO сделать общий стиль для радиусов для инпута
    border-radius: var(--default-border-radius);
    padding-left: var(--default-indentation-input);

    @include nmorph-outset;
  }
  .nmorph-date-picker__input {
    cursor: pointer;
  }
  .nmorph-date-picker__input--open {
    @include nmorph-inset;
  }
  .nmorph-date-picker__calendar-icon {
    margin-right: 8px;
  }
  .nmorph-dropdown {
    padding: var(--indentation-03);
  }
  input {
    display: none;
  }
  .nmorph-calendar {
    --table-data-cell-height: 42px;
  }
}
</style>
