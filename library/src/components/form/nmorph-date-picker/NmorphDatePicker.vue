<script setup lang="ts">
import { computed, ref } from 'vue';
import { disabled, ellipsis, focusOutline, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType, NmorphSelectionDateType } from '@/types';
import {
  NmorphDropdown,
  NmorphIcon,
  formatDateIntl,
  NmorphSelectedDateModelType,
  NmorphIconCalendar,
} from '@/components';
import NmorphClearButton from './inner-components/nmorph-clear-button/NmorphClearButton.vue';
import NmorphDatePickerContent from './inner-components/nmorph-date-picker-content/NmorphDatePickerContent.vue';
import { useI18n } from 'vue-i18n';
import { styled, css } from '@vue-styled-components/core';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

interface INmorphProps extends INmorphCommonInputProps {
  placeholder?: string;
  modelValue: NmorphSelectedDateModelType;
  type?: keyof typeof NmorphSelectionDateType;
  textSeparator?: string;
  initialDate?: Date;
  zIndex?: number;
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
});

const { id, name, autocomplete } = useFormItemInput(props);

const placeholderText = computed(() => (props.placeholder ? props.placeholder : t('pickADate')));

const selectedDate = ref<NmorphSelectedDateModelType>(props.modelValue);

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update:model-value', modelValue: NmorphSelectedDateModelType): void;
}

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
    'nmorph-date-picker': [`${props.disabled && 'disabled'}`, props.type, `${focus.value && 'focus'}`],
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
  if (!selectedDate.value) return placeholderText.value;
  if (Array.isArray(selectedDate.value)) {
    if (selectedDate.value.length === 0) return placeholderText.value;
    const arrayResult = formatDateIntl(selectedDate.value) as unknown[];
    const separator = props.type === 'daterange' ? ' - ' : ', ';
    return arrayResult.join(separator);
  } else {
    return formatDateIntl(selectedDate.value);
  }
});

const clearHandler = () => {
  const result = Array.isArray(selectedDate.value) ? [] : null;
  selectedDate.value = result;
  emit('update:model-value', selectedDate.value);
};

const updateSelectedDateHandler = (value: NmorphSelectedDateModelType) => {
  selectedDate.value = value;
  emit('update:model-value', selectedDate.value);
};

const showClearButton = computed(() => {
  if (Array.isArray(selectedDate.value)) {
    return selectedDate.value.length > 0;
  }
  return Boolean(selectedDate.value);
});

const commonCSS = css`
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 var(--indentation-03);
    overflow: hidden;

    // TODO сделать общий стиль для радиусов для инпута
    border-radius: var(--default-border-radius);
    cursor: pointer;

    ${nmorphOutset()}
  }

  .nmorph-date-picker__selected-value {
    ${ellipsis()}
  }

  .nmorph-date-picker__input--open {
    ${nmorphInset()}
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
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .nmorph-calendar {
    --table-data-cell-height: 42px;
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
    ${focusOutline()}
  }

  &.nmorph-date-picker--disabled {
    ${disabled()}

    .nmorph-date-picker__date-wrapper {
      pointer-events: none;
    }
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers">
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
  </StyledComponent>
</template>
