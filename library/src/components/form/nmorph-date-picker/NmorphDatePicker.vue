<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { toCssSize, useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType, NmorphSelectionDateType } from '@/types';
import {
  NmorphDropdown,
  NmorphIcon,
  formatDate,
  NmorphDateFormatterType,
  NmorphSelectedDateModelType,
  NmorphIconCalendar,
} from '@/components';
import NmorphClearButton from './inner-components/nmorph-clear-button/NmorphClearButton.vue';
import NmorphDatePickerContent from './inner-components/nmorph-date-picker-content/NmorphDatePickerContent.vue';
import { useI18n } from 'vue-i18n';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';

interface INmorphProps extends INmorphCommonInputProps {
  placeholder?: string;
  modelValue?: NmorphSelectedDateModelType;
  type?: keyof typeof NmorphSelectionDateType;
  textSeparator?: string;
  initialDate?: Date;
  zIndex?: number;
  dateLocale?: string | string[];
  dateFormatOptions?: Intl.DateTimeFormatOptions;
  dateFormat?: string;
  dateFormatter?: NmorphDateFormatterType;
  valueSeparator?: string;
  rangeSeparator?: string;
  width?: number | string;
  calendarCellHeight?: number | string;
}

const { t } = useI18n();

const props = withDefaults(defineProps<INmorphProps>(), {
  disabled: false,
  height: 'basic',
  placeholder: '',
  modelValue: null,
  type: 'date',
  textSeparator: '-',
  initialDate: () => new Date(),
  zIndex: undefined,
  dateLocale: undefined,
  dateFormatOptions: undefined,
  dateFormat: '',
  dateFormatter: undefined,
  valueSeparator: ', ',
  rangeSeparator: ' - ',
  width: undefined,
  calendarCellHeight: undefined,
});

const { id, name, autocomplete } = useFormItemInput(props);

const placeholderText = computed(() => (props.placeholder ? props.placeholder : t('pickADate')));

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update:model-value', modelValue: NmorphSelectedDateModelType): void;
}
const { modelValue, updateModelValue } = useFormItemModel<NmorphSelectedDateModelType>(
  props,
  (value) => emit('update:model-value', value),
  null
);
const selectedDate = ref<NmorphSelectedDateModelType>(modelValue.value);

const focus = ref(false);
const focusHandler = () => {
  focus.value = true;
};
const blurHandler = () => {
  focus.value = false;
};

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-date-picker': [props.disabled && 'disabled', props.type, focus.value && 'focus'],
  })
);

const styles = computed<CSSProperties>(() => ({
  ...(props.width !== undefined && { '--width': toCssSize(props.width) }),
  ...(props.calendarCellHeight !== undefined && {
    '--date-picker-calendar-cell-height': toCssSize(props.calendarCellHeight),
  }),
}));

const open = ref(false);
const nmorphInputDOMRef = ref<NmorphDomElementType>(null);

const closeHandler = () => {
  open.value = false;
};
const toggleOpen = () => {
  open.value = !open.value;
};

const displayValue = computed(() => {
  if (!selectedDate.value) return placeholderText.value;
  const formatOptions = {
    locale: props.dateLocale,
    options: props.dateFormatOptions,
    format: props.dateFormat,
    formatter: props.dateFormatter,
  };

  if (Array.isArray(selectedDate.value)) {
    if (selectedDate.value.length === 0) return placeholderText.value;
    const arrayResult = formatDate(selectedDate.value, formatOptions) as unknown[];
    const separator = props.type === 'daterange' ? props.rangeSeparator : props.valueSeparator;
    return arrayResult.join(separator);
  } else {
    return formatDate(selectedDate.value, formatOptions);
  }
});

const clearHandler = () => {
  const result = Array.isArray(selectedDate.value) ? [] : null;
  selectedDate.value = result;
  updateModelValue(selectedDate.value);
};

const updateSelectedDateHandler = (value: NmorphSelectedDateModelType) => {
  selectedDate.value = value;
  updateModelValue(selectedDate.value);
};

watch(
  modelValue,
  (newValue) => {
    selectedDate.value = newValue;
  },
  { deep: true }
);

const showClearButton = computed(() => {
  if (Array.isArray(selectedDate.value)) {
    return selectedDate.value.length > 0;
  }
  return Boolean(selectedDate.value);
});
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-date-picker__date-wrapper">
      <div
        ref="nmorphInputDOMRef"
        class="nmorph-date-picker__input"
        :class="{ 'nmorph-date-picker__input--open': open }"
        @click="toggleOpen"
      >
        <input
          :id="id"
          :name="name"
          :autocomplete="autocomplete"
          type="date"
          @focus.prevent="focusHandler"
          @blur="blurHandler"
          @keydown.space.prevent="() => {}"
        />
        <NmorphIcon class="nmorph-date-picker__calendar-icon">
          <NmorphIconCalendar />
        </NmorphIcon>
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
          :z-index="props.zIndex"
          @on-outside-click="closeHandler"
        >
          <NmorphDatePickerContent
            :selected-values="selectedDate"
            :initial-date="props.initialDate"
            :type="type"
            @update-selected-value="updateSelectedDateHandler"
          />
        </NmorphDropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-date-picker {
  --width: 200px;
  --date-picker-calendar-cell-height: 42px;

  position: relative;
  width: var(--width);

  .nmorph-date-picker__date-wrapper {
    height: 100%;
  }

  .nmorph-date-picker__date-range-wrapper {
    height: 100%;
  }

  .nmorph-date-picker__input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 var(--indentation-03);
    overflow: hidden;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow: var(--nmorph-shadow-outset);
    cursor: pointer;
  }

  .nmorph-date-picker__selected-value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-date-picker__input--open {
    background: var(--nmorph-main-color);
    box-shadow: var(--nmorph-shadow-inset);
  }

  .nmorph-date-picker__calendar-icon {
    margin-right: 2px;
  }

  .nmorph-date-picker__clear-button-wrapper {
    width: 14px;
    height: 14px;
    margin-right: 1px;
  }

  .nmorph-dropdown {
    padding: var(--indentation-03);
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
  }

  .nmorph-calendar {
    --table-data-cell-height: var(--date-picker-calendar-cell-height);
  }

  &.nmorph-date-picker--daterange {
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

  &.nmorph-date-picker--focus {
    outline: 2px solid var(--nmorph-accent-color);
  }

  &.nmorph-date-picker--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-date-picker__date-wrapper {
      pointer-events: none;
    }
  }
}
</style>
