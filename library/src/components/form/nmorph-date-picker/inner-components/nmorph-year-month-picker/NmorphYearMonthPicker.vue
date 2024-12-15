<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { nmorphInset, useModifiers } from '@/utils';
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
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  currentDate: Date;
  type?: 'year' | 'month';
}

const { months } = useCalendarTexts();

const initialMonthData: INmorphRadioOption[] = months.map((monthName, idx) => {
  const label = monthName.substring(0, 3);
  return {
    label,
    value: String(idx),
    tabindex: -1,
  };
});

const props = withDefaults(defineProps<INmorphProps>(), {
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

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update-year', val: string): void;
  (e: 'update-month', val: string): void;
  (e: 'back-to-years'): void;
}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-year-month-picker': [],
  })
);

const updateModelValue = (value: string) => {
  selectedValue.value = value;
  if (props.type === 'month') emit('update-month', selectedValue.value);
  else emit('update-year', selectedValue.value);
};

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

const commonCSS = css`
  .nmorph-year-month-picker__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: var(--indentation-04);
  }

  .nmorph-year-month-picker__value {
    ${nmorphInset()}

    border-radius: var(--default-border-radius);
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
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <div class="nmorph-year-month-picker__header">
      <NmorphButton class="nmorph-year-month-picker__action-btn" @click="buttonClickHandler('decrease')" :tabindex="-1">
        <NmorphIcon class="nmorph-year-month-picker__chevron-left">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
      <div class="nmorph-year-month-picker__value">
        <NmorphButton :text="value" style-type="transparent" @click="goToYearsHandler" :tabindex="-1" />
      </div>
      <NmorphButton class="nmorph-year-month-picker__action-btn" @click="buttonClickHandler('increase')" :tabindex="-1">
        <NmorphIcon class="nmorph-year-month-picker__chevron-right">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </NmorphButton>
    </div>
    <NmorphDivider />
    <div class="nmorph-year-month-picker__values">
      <NmorphRadioGroup :model-value="selectedValue" :options="values" @update:model-value="updateModelValue" />
    </div>
  </StyledComponent>
</template>
