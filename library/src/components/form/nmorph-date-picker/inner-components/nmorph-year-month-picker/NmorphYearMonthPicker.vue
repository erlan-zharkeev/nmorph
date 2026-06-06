<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  NmorphButton,
  NmorphIcon,
  NmorphRadioGroup,
  getDecadeYears,
  useCalendarTexts,
  NmorphDivider,
  NmorphIconChevronDown,
} from '@/components';
import { INmorphRadioOption, NmorphDatePickerControlsType } from '@/types';
import type { INmorphYearMonthPickerEmit, INmorphYearMonthPickerProps } from './types';

const { months } = useCalendarTexts();

const initialMonthData: INmorphRadioOption[] = months.map((monthName, idx) => {
  const label = monthName.substring(0, 3);
  return {
    label,
    value: String(idx),
    tabindex: -1,
  };
});

const props = withDefaults(defineProps<INmorphYearMonthPickerProps>(), {
  type: 'month',
});

const values = ref<INmorphRadioOption[]>(initialMonthData);
const selectedValue = ref(String(props.currentDate.getMonth()));
const selectedYear = ref(props.currentDate.getFullYear());

const setInitialYearsData = () => {
  const currentYear = props.currentDate.getFullYear();
  const years = getDecadeYears(currentYear).map((year) => {
    return { label: String(year), value: String(year) };
  });
  values.value = years;
};

watch(
  () => props.currentDate,
  () => {
    if (props.type === 'year') {
      setInitialYearsData();
      selectedValue.value = String(props.currentDate.getFullYear());
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const emit = defineEmits<INmorphYearMonthPickerEmit>();

const selectedValueModel = computed({
  get: () => selectedValue.value,
  set: (value: string) => {
    selectedValue.value = value;

    if (props.type === 'month') emit('update-month', selectedValue.value);
    else emit('update-year', selectedValue.value);
  },
});

const updateYearValues = (operator: NmorphDatePickerControlsType) => {
  values.value = values.value.map((year) => {
    const value = operator === 'decrease' ? String(Number(year.value) - 10) : String(Number(year.value) + 10);
    return {
      label: value,
      value,
    };
  });
};

const updateYear = (operator: NmorphDatePickerControlsType) => {
  if (operator === 'decrease') selectedYear.value = selectedYear.value - 1;
  else selectedYear.value = selectedYear.value + 1;
  emit('update-year', String(selectedYear.value));
};

const buttonClickHandler = (value: NmorphDatePickerControlsType) => {
  if (value === 'decrease') {
    props.type === 'year' ? updateYearValues('decrease') : updateYear('decrease');
  } else {
    props.type === 'year' ? updateYearValues('increase') : updateYear('increase');
  }
};

const value = computed(() => {
  if (props.type === 'year') {
    return `${values.value[0].label} - ${values.value[values.value.length - 1].label}`;
  }
  return String(selectedYear.value);
});
const goToYearsHandler = () => {
  if (props.type === 'month') emit('back-to-years');
};
</script>

<template>
  <div class="nmorph-year-month-picker">
    <div class="nmorph-year-month-picker__header">
      <NmorphButton class="nmorph-year-month-picker__action-btn" :tabindex="-1" @click="buttonClickHandler('decrease')">
        <NmorphIcon class="nmorph-year-month-picker__chevron-left">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
      <div class="nmorph-year-month-picker__value">
        <NmorphButton :text="value" :tabindex="-1" @click="goToYearsHandler" />
      </div>
      <NmorphButton class="nmorph-year-month-picker__action-btn" :tabindex="-1" @click="buttonClickHandler('increase')">
        <NmorphIcon class="nmorph-year-month-picker__chevron-right">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
    </div>
    <NmorphDivider />
    <div class="nmorph-year-month-picker__values">
      <NmorphRadioGroup v-model="selectedValueModel" :options="values" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-year-month-picker {
  .nmorph-year-month-picker__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: var(--indentation-04);
  }

  .nmorph-year-month-picker__value {
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-year-month-picker__values {
    padding-top: var(--indentation-04);
  }

  .nmorph-radio-group {
    width: 100%;
  }

  .nmorph-radio-group .nmorph-radio-group__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .nmorph-radio-group .nmorph-radio:not(:last-child) {
    width: 100%;
    margin: 0;
  }

  .nmorph-year-month-picker__chevron-left {
    rotate: 90deg;
  }

  .nmorph-year-month-picker__chevron-right {
    rotate: -90deg;
  }
}
</style>
