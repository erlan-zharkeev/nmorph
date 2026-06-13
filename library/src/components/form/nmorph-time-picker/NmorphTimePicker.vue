<script setup lang="ts">
import { NmorphComponentThickness } from '@/types';
import { computed, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useI18n } from 'vue-i18n';
import { createCssSizeVariables, useModifiers } from '@/utils';
import {
  NmorphButton,
  NmorphDropdown,
  NmorphIcon,
  NmorphIconCircleClose,
  NmorphIconClock,
  NmorphScroll,
} from '@/components';
import { useFocusableInput } from '@/hooks/use-focusable-input';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';
import type {
  INmorphTimeParts,
  INmorphTimePickerEmit,
  INmorphTimePickerProps,
  INmorphTimePickerUnit,
  NmorphTimePickerModelValueType,
} from './types';

const props = withDefaults(defineProps<INmorphTimePickerProps>(), {
  modelValue: null,
  placeholder: '',
  thickness: 'basic',
  disabled: false,
  hourStep: 1,
  minuteStep: 5,
  secondStep: 1,
  showSeconds: false,
  minTime: '',
  maxTime: '',
  clearable: true,
  zIndex: undefined,
  width: undefined,
});

const emit = defineEmits<INmorphTimePickerEmit>();

const { t } = useI18n();
const { id, name, autocomplete, tabindex } = useFormItemInput(props);
const { modelValue, updateModelValue } = useFormItemModel<NmorphTimePickerModelValueType>(
  props,
  (value) => emit('update:model-value', value),
  null
);
const open = ref(false);
const {
  elementRef: inputDOMRef,
  focused,
  handleFocus: focusHandler,
  handleBlur: blurHandler,
} = useFocusableInput<HTMLDivElement>({
  onFocus: () => emit('focus'),
  onBlur: () => emit('blur'),
});

const pad = (value: number) => String(value).padStart(2, '0');
const normalizeStep = (value: number) => Math.max(1, Math.floor(Number.isFinite(value) ? value : 1));

const parseTime = (value?: string | null): INmorphTimeParts | null => {
  if (!value) return null;
  const match = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3] || 0);
  if (hour > 23 || minute > 59 || second > 59) return null;
  return { hour, minute, second };
};

const formatTime = (parts: INmorphTimeParts) => {
  const base = `${pad(parts.hour)}:${pad(parts.minute)}`;
  return props.showSeconds ? `${base}:${pad(parts.second)}` : base;
};

const timeToSeconds = (parts: INmorphTimeParts) => parts.hour * 3600 + parts.minute * 60 + parts.second;
const minTimeParts = computed(() => parseTime(props.minTime));
const maxTimeParts = computed(() => parseTime(props.maxTime));
const modelTimeParts = computed(() => parseTime(modelValue.value));
const pickerValue = ref<INmorphTimeParts>(modelTimeParts.value || { hour: 0, minute: 0, second: 0 });
const placeholderText = computed(() => props.placeholder || t('pickATime'));

watch(modelValue, (value) => {
  const parsedValue = parseTime(value);
  if (parsedValue) pickerValue.value = parsedValue;
});

const isOutsideRange = (parts: INmorphTimeParts) => {
  const seconds = timeToSeconds(parts);
  if (minTimeParts.value && seconds < timeToSeconds(minTimeParts.value)) return true;
  if (maxTimeParts.value && seconds > timeToSeconds(maxTimeParts.value)) return true;
  return false;
};

const getUnitOptions = (unit: keyof INmorphTimeParts, max: number, step: number): INmorphTimePickerUnit[] => {
  const normalizedStep = normalizeStep(step);
  const values = new Set<number>();
  for (let value = 0; value <= max; value += normalizedStep) values.add(value);
  values.add(pickerValue.value[unit]);

  return Array.from(values)
    .filter((value) => value >= 0 && value <= max)
    .sort((first, second) => first - second)
    .map((value) => {
      const nextValue = { ...pickerValue.value, [unit]: value };
      return {
        label: pad(value),
        value,
        disabled: isOutsideRange(nextValue),
      };
    });
};

const hourOptions = computed(() => getUnitOptions('hour', 23, props.hourStep));
const minuteOptions = computed(() => getUnitOptions('minute', 59, props.minuteStep));
const secondOptions = computed(() => getUnitOptions('second', 59, props.secondStep));

const selectUnit = (unit: keyof INmorphTimeParts, value: number) => {
  const nextValue = { ...pickerValue.value, [unit]: value };
  if (isOutsideRange(nextValue)) return;
  pickerValue.value = nextValue;
  updateModelValue(formatTime(nextValue));
};

const clearHandler = () => {
  updateModelValue(null);
  open.value = false;
};

const closeHandler = () => {
  open.value = false;
};

const toggleOpen = () => {
  if (props.disabled) return;
  open.value = !open.value;
};

const nativeInputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const parsedValue = parseTime(target.value);
  if (!parsedValue || isOutsideRange(parsedValue)) return;
  pickerValue.value = parsedValue;
  updateModelValue(formatTime(parsedValue));
};

const displayValue = computed(() => modelValue.value || placeholderText.value);
const inputStep = computed(() =>
  props.showSeconds ? normalizeStep(props.secondStep) : normalizeStep(props.minuteStep) * 60
);
const showClearButton = computed(() => props.clearable && Boolean(modelValue.value) && !props.disabled);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness]],
    'nmorph-time-picker': [
      props.disabled && 'disabled',
      open.value && 'open',
      focused.value && 'focus',
      !modelValue.value && 'placeholder',
    ],
  })
);

const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-private-time-picker-width': props.width,
  })
);

defineExpose({ inputDOMRef });
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div
      ref="inputDOMRef"
      class="nmorph-time-picker__input"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="`${id}-dropdown`"
      :tabindex="props.disabled ? -1 : tabindex"
      @click="toggleOpen"
      @focus="focusHandler"
      @blur="blurHandler"
      @keydown.space.prevent="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.escape.prevent="closeHandler"
    >
      <input
        :id="id"
        class="nmorph-time-picker__native"
        :name="name"
        :autocomplete="autocomplete"
        type="time"
        :step="inputStep"
        :value="modelValue || ''"
        :disabled="props.disabled"
        @input="nativeInputHandler"
      />
      <NmorphIcon class="nmorph-time-picker__clock-icon">
        <NmorphIconClock />
      </NmorphIcon>
      <div class="nmorph-time-picker__selected-value">{{ displayValue }}</div>
      <button
        class="nmorph-time-picker__clear"
        :class="{ 'nmorph-time-picker__clear--hidden': !showClearButton }"
        type="button"
        :disabled="!showClearButton"
        :tabindex="showClearButton ? 0 : -1"
        :aria-hidden="!showClearButton"
        aria-label="Clear time"
        @click.stop="clearHandler"
      >
        <NmorphIcon width="14px" height="14px">
          <NmorphIconCircleClose />
        </NmorphIcon>
      </button>
    </div>
    <NmorphDropdown
      v-if="inputDOMRef && !props.disabled"
      :open="open"
      :relative-element="inputDOMRef"
      :width="props.showSeconds ? 300 : 208"
      :fill-width="false"
      :z-index="props.zIndex"
      :aria-label="name"
      @on-outside-click="closeHandler"
      @on-escape-keydown="closeHandler"
    >
      <div
        :id="`${id}-dropdown`"
        class="nmorph-time-picker__panel"
        :class="{ 'nmorph-time-picker__panel--with-seconds': props.showSeconds }"
      >
        <div class="nmorph-time-picker__column" role="listbox" aria-label="Hours">
          <NmorphScroll height="210px" :gap="6" scroll-x-prop="hidden" css-scroll-behavior="auto">
            <NmorphButton
              v-for="option in hourOptions"
              :key="option.value"
              class="nmorph-time-picker__option"
              design="plain"
              :text="option.label"
              :thickness="props.thickness"
              :active="option.value === pickerValue.hour"
              :disabled="option.disabled"
              @click="selectUnit('hour', option.value)"
            />
          </NmorphScroll>
        </div>
        <div class="nmorph-time-picker__separator">:</div>
        <div class="nmorph-time-picker__column" role="listbox" aria-label="Minutes">
          <NmorphScroll height="210px" :gap="6" scroll-x-prop="hidden" css-scroll-behavior="auto">
            <NmorphButton
              v-for="option in minuteOptions"
              :key="option.value"
              class="nmorph-time-picker__option"
              design="plain"
              :text="option.label"
              :thickness="props.thickness"
              :active="option.value === pickerValue.minute"
              :disabled="option.disabled"
              @click="selectUnit('minute', option.value)"
            />
          </NmorphScroll>
        </div>
        <template v-if="props.showSeconds">
          <div class="nmorph-time-picker__separator">:</div>
          <div class="nmorph-time-picker__column" role="listbox" aria-label="Seconds">
            <NmorphScroll height="210px" :gap="6" scroll-x-prop="hidden" css-scroll-behavior="auto">
              <NmorphButton
                v-for="option in secondOptions"
                :key="option.value"
                class="nmorph-time-picker__option"
                design="plain"
                :text="option.label"
                :thickness="props.thickness"
                :active="option.value === pickerValue.second"
                :disabled="option.disabled"
                @click="selectUnit('second', option.value)"
              />
            </NmorphScroll>
          </div>
        </template>
      </div>
    </NmorphDropdown>
  </div>
</template>

<style lang="scss">
.nmorph-time-picker {
  --nmorph-private-time-picker-width: fit-content;

  position: relative;
  display: inline-block;
  width: var(--nmorph-private-time-picker-width);
  min-width: 0;
  height: var(--nmorph-private-control-height);

  .nmorph-time-picker__input {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: 0 var(--default-indentation-input);
    overflow: hidden;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow: var(--nmorph-shadow-outset);
    cursor: pointer;
  }

  .nmorph-time-picker__native {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
    opacity: 0;
    pointer-events: none;
  }

  .nmorph-time-picker__clock-icon {
    flex: 0 0 auto;
  }

  .nmorph-time-picker__selected-value {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transform: translateY(var(--nmorph-private-control-text-offset-y));
  }

  .nmorph-time-picker__clear {
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
    width: 18px;
    height: 18px;
    padding: 0;
    color: var(--nmorph-text-color);
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .nmorph-time-picker__clear--hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.nmorph-time-picker--open {
    .nmorph-time-picker__input {
      box-shadow: var(--nmorph-shadow-inset);
    }
  }

  &.nmorph-time-picker--focus {
    outline: 2px solid var(--nmorph-accent-color);
  }

  &.nmorph-time-picker--placeholder {
    .nmorph-time-picker__selected-value {
      color: var(--nmorph-placeholder-text-color);
    }
  }

  &.nmorph-time-picker--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-time-picker__input {
      pointer-events: none;
    }
  }
}

.nmorph-time-picker__panel {
  display: grid;
  grid-template-columns: minmax(64px, 1fr) 8px minmax(64px, 1fr);
  gap: 8px;
  align-items: start;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  color: var(--nmorph-text-color);
}

.nmorph-time-picker__panel--with-seconds {
  grid-template-columns: minmax(64px, 1fr) 8px minmax(64px, 1fr) 8px minmax(64px, 1fr);
}

.nmorph-time-picker__column {
  min-width: 0;
  padding: 4px;
  background: color-mix(in srgb, var(--nmorph-text-color) 4%, transparent);
  border-radius: var(--default-border-radius);
}

.nmorph-time-picker__column .nmorph-scroll {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: minmax(0, 1fr);
}

.nmorph-time-picker__column .nmorph-scroll__viewport {
  padding: 0 2px 0 0;
}

.nmorph-time-picker__separator {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 8px;
  padding-top: calc((var(--nmorph-private-control-height) - 1em) / 2 + 2px);
  color: var(--nmorph-semi-contrast-text-color);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.nmorph-time-picker__option {
  width: 100%;
  min-width: 0;

  .nmorph-button__content {
    width: 100%;
    min-width: 0;
    padding-right: var(--indentation-02);
    padding-left: var(--indentation-02);
    background: transparent;
  }

  &.nmorph-button--plain .nmorph-button__content:not(:disabled, [loading='true']):hover {
    background: color-mix(in srgb, var(--nmorph-accent-color) 14%, transparent);
  }

  &.nmorph-button.nmorph-button--active .nmorph-button__content {
    color: var(--nmorph-focus-text-color);
    background: var(--nmorph-accent-color);
    border-color: var(--nmorph-accent-color);
    box-shadow: none;
  }

  &.nmorph-button.nmorph-button--active .nmorph-button__content span,
  &.nmorph-button.nmorph-button--active .nmorph-button__content .nmorph-icon {
    color: var(--nmorph-focus-text-color);

    --nmorph-private-icon-color: var(--nmorph-focus-text-color);
  }
}
</style>
