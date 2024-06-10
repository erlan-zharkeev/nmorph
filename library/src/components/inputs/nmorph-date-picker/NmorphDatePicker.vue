<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types/common';
import { NmorphDropdown, NmorphIcon, NmorphDivider } from '@/components';
import { formatDateIntl } from '@/components/nmorph-calendar/utils';
import { NmorphSelectionDateType } from './components/types';
import NmorphDatePickerContent from './components/nmorph-date-picker-content/NmorphDatePickerContent.vue';
import { NmorphDateType, NmorphSelectedDateModelType } from '@/components/nmorph-calendar/types';
import NmorphClearButton from './../nmorph-clear-button/NmorphClearButton.vue';

interface INmorphProps extends Omit<INmorphCommonInputProps, 'fill'> {
  placeholder?: string;
  initialStartDate?: Date;
  initialEndDate?: Date;
  modelValue: NmorphSelectedDateModelType;
  type?: keyof typeof NmorphSelectionDateType;
  textSeparator?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  disabled: false,
  height: 'default',
  placeholder: 'Pick a date',
  initialStartDate: () => new Date(),
  initialEndDate: undefined,
  modelValue: null,
  type: 'date',
  textSeparator: 'To',
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
});

const startDate = ref(props.initialStartDate);
const endDate = ref(
  props.initialEndDate ?? new Date(new Date(props.initialStartDate).setMonth(props.initialStartDate.getMonth() + 1))
);

const selectedDate = ref<NmorphSelectedDateModelType>(props.modelValue);

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update:modelValue', modelValue: NmorphSelectedDateModelType): void;
}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-date-picker': [`${props.disabled && 'disabled'}`, props.type],
  })
);

const open = ref(false);
const nmorphInputDOMRef = ref<NmorphDomElementType>(null);

const closeHandler = () => {
  open.value = false;
};
const toggleOpen = () => {
  open.value = !open.value;
};

const displayValue = computed(() => {
  if (!selectedDate.value) return props.placeholder;
  if (Array.isArray(selectedDate.value)) {
    if (selectedDate.value.length === 0) return props.placeholder;
    const arrayResult = formatDateIntl(selectedDate.value) as unknown[];
    return arrayResult.join(', ');
  } else {
    return formatDateIntl(selectedDate.value);
  }
});

const displayValues = computed(() => {
  if (Array.isArray(selectedDate.value)) {
    const from = formatDateIntl(selectedDate.value[0]) ?? props.startDatePlaceholder;
    const to = formatDateIntl(selectedDate.value[1]) ?? props.endDatePlaceholder;
    return {
      from,
      to,
    };
  } else {
    return { from: props.startDatePlaceholder, to: props.endDatePlaceholder };
  }
});

const clearHandler = () => {
  const result = Array.isArray(selectedDate.value) ? [] : null;
  selectedDate.value = result;
  emit('update:modelValue', selectedDate.value);
};

if (props.type === 'date' && Array.isArray(selectedDate.value)) {
  console.warn('If you decide to use type "date" the passed property must be an Date object');
}

if ((props.type === 'dates' || props.type === 'daterange') && !Array.isArray(selectedDate.value)) {
  console.warn('If you decide to use type "dates" or "daterange" the passed property must be an array');
}

const updateSelectedDateHandler = (value: unknown) => {
  const val = value as Date;
  if (Array.isArray(selectedDate.value)) {
    if (props.type === 'dates') {
      const dateToCompare = val.toDateString();
      const transformedSelectedValues = selectedDate.value.map((val) => val?.toDateString());
      const hasValueIndex = transformedSelectedValues.findIndex((value) => dateToCompare === value);
      if (transformedSelectedValues.includes(dateToCompare)) {
        selectedDate.value.splice(hasValueIndex, 1);
      } else selectedDate.value.push(val);
    }
  } else {
    selectedDate.value = val;
  }
  emit('update:modelValue', selectedDate.value);
};

const showClearButton = computed(() => {
  if (Array.isArray(selectedDate.value)) {
    return selectedDate.value.length > 0;
  }
  return Boolean(selectedDate.value);
});

const updateStartDateValue = (value: NmorphDateType) => {
  if (!Array.isArray(selectedDate.value)) return;
  selectedDate.value[0] = value;
  emit('update:modelValue', selectedDate.value);
};

const updateEndDateValue = (value: NmorphDateType) => {
  if (!Array.isArray(selectedDate.value)) return;
  selectedDate.value[1] = value;
  emit('update:modelValue', selectedDate.value);
};
</script>

<template>
  <div :class="modifiers">
    <div v-if="props.type === 'date' || props.type === 'dates'" class="nmorph-date-picker__date-wrapper">
      <div
        ref="nmorphInputDOMRef"
        class="nmorph-date-picker__input"
        :class="{ 'nmorph-date-picker__input--open': open }"
        @click="toggleOpen"
      >
        <input type="date" />
        <NmorphIcon name="calendar" class="nmorph-date-picker__calendar-icon" />
        <div class="nmorph-date-picker__selected-value">{{ displayValue }}</div>
        <div class="nmorph-date-picker__clear-button-wrapper">
          <NmorphClearButton v-if="showClearButton" @clear="clearHandler" />
        </div>
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
          <NmorphDatePickerContent
            :selected-values="selectedDate"
            :initial-date="startDate"
            :type="type"
            @update-selected-value="updateSelectedDateHandler"
          />
        </NmorphDropdown>
      </div>
    </div>
    <div v-if="props.type === 'daterange'" class="nmorph-date-picker__date-range-wrapper">
      <div
        ref="nmorphInputDOMRef"
        class="nmorph-date-picker__input"
        :class="{ 'nmorph-date-picker__input--open': open }"
        @click="toggleOpen"
      >
        <input type="date" />
        <NmorphIcon name="calendar" class="nmorph-date-picker__calendar-icon" />
        <div class="nmorph-date-picker__selected-value">
          <div class="nmorph-date-picker__value-from">
            {{ displayValues.from }}
          </div>
          <div class="nmorph-date-picker__value-separator">{{ props.textSeparator }}</div>
          <div class="nmorph-date-picker__value-from">
            {{ displayValues.to }}
          </div>
        </div>
        <div class="nmorph-date-picker__clear-button-wrapper">
          <NmorphClearButton v-if="showClearButton" @clear="clearHandler" />
        </div>
      </div>
      <div class="nmorph-date-picker__content">
        <NmorphDropdown
          v-if="nmorphInputDOMRef"
          :fill-width="false"
          :width="648"
          :open="open"
          :relative-element="nmorphInputDOMRef"
          @on-outside-click="closeHandler"
        >
          <NmorphDatePickerContent
            :selected-values="selectedDate"
            :initial-date="startDate"
            :type="type"
            @update-selected-value="updateStartDateValue"
          />
          <NmorphDivider direction="vertical" />
          <NmorphDatePickerContent
            :selected-values="selectedDate"
            :initial-date="endDate"
            :type="type"
            @update-selected-value="updateEndDateValue"
          />
        </NmorphDropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-date-picker {
  --width: 200px;
  position: relative;
  width: var(--width);

  .nmorph-date-picker__date-wrapper {
    height: 100%;
  }

  .nmorph-date-picker__date-range-wrapper {
    height: 100%;
  }

  .nmorph-date-picker__input {
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // TODO сделать общий стиль для радиусов для инпута
    border-radius: var(--default-border-radius);
    cursor: pointer;
    padding: 0 var(--indentation-03);
    @include nmorph-outset;
  }

  .nmorph-date-picker__selected-value {
    @include ellipsis;
  }

  .nmorph-date-picker__input--open {
    @include nmorph-inset;
  }

  .nmorph-date-picker__calendar-icon {
    margin-right: 2px;
  }

  .nmorph-date-picker__clear-button-wrapper {
    width: 14px;
    height: 14px;
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

.nmorph-date-picker--daterange {
  --width: 250px;

  .nmorph-dropdown {
    display: flex;
    justify-content: space-between;
  }

  .nmorph-date-picker__value-separator {
    padding: 0 var(--indentation-03);
  }

  .nmorph-date-picker__selected-value {
    display: flex;
  }
}
</style>
