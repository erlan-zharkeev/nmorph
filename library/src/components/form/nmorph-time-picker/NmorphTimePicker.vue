<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { computed, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModifiers } from '@/utils';
import { NmorphDropdown, NmorphIcon, NmorphIconCircleClose, NmorphIconClock } from '@/components';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';
import { INmorphTimePickerUnit, NmorphTimePickerModelValueType } from './types';

interface INmorphTimeParts {
  hour: number;
  minute: number;
  second: number;
}

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: NmorphTimePickerModelValueType;
  placeholder?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSeconds?: boolean;
  minTime?: string;
  maxTime?: string;
  clearable?: boolean;
  zIndex?: number;
  width?: number | string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: null,
  placeholder: '',
  height: 'basic',
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

const emit = defineEmits<{
  (e: 'update:model-value', val: NmorphTimePickerModelValueType): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const { t } = useI18n();
const { id, name, autocomplete, tabindex } = useFormItemInput(props);
const open = ref(false);
const focused = ref(false);
const inputDOMRef = ref<NmorphDomElementType>(null);

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
const modelTimeParts = computed(() => parseTime(props.modelValue));
const pickerValue = ref<INmorphTimeParts>(modelTimeParts.value || { hour: 0, minute: 0, second: 0 });
const placeholderText = computed(() => props.placeholder || t('pickATime'));

watch(
  () => props.modelValue,
  (value) => {
    const parsedValue = parseTime(value);
    if (parsedValue) pickerValue.value = parsedValue;
  }
);

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
  emit('update:model-value', formatTime(nextValue));
};

const clearHandler = () => {
  emit('update:model-value', null);
  open.value = false;
};

const closeHandler = () => {
  open.value = false;
};

const toggleOpen = () => {
  if (props.disabled) return;
  open.value = !open.value;
};

const focusHandler = () => {
  focused.value = true;
  emit('focus');
};

const blurHandler = () => {
  focused.value = false;
  emit('blur');
};

const nativeInputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const parsedValue = parseTime(target.value);
  if (!parsedValue || isOutsideRange(parsedValue)) return;
  pickerValue.value = parsedValue;
  emit('update:model-value', formatTime(parsedValue));
};

const displayValue = computed(() => props.modelValue || placeholderText.value);
const inputStep = computed(() =>
  props.showSeconds ? normalizeStep(props.secondStep) : normalizeStep(props.minuteStep) * 60
);
const showClearButton = computed(() => props.clearable && Boolean(props.modelValue) && !props.disabled);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-time-picker': [
      `${props.disabled && 'disabled'}`,
      `${open.value && 'open'}`,
      `${focused.value && 'focus'}`,
      `${!props.modelValue && 'placeholder'}`,
    ],
  })
);

const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);
const styles = computed<CSSProperties>(() => ({
  ...(props.width !== undefined && { '--width': getCssSize(props.width) }),
}));

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
        :value="props.modelValue || ''"
        :disabled="props.disabled"
        @input="nativeInputHandler"
      />
      <NmorphIcon class="nmorph-time-picker__clock-icon">
        <NmorphIconClock />
      </NmorphIcon>
      <div class="nmorph-time-picker__selected-value">{{ displayValue }}</div>
      <button
        v-if="showClearButton"
        class="nmorph-time-picker__clear"
        type="button"
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
      :width="props.showSeconds ? 216 : 152"
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
          <button
            v-for="option in hourOptions"
            :key="option.value"
            type="button"
            class="nmorph-time-picker__option"
            :class="{ 'nmorph-time-picker__option--active': option.value === pickerValue.hour }"
            :disabled="option.disabled"
            @click="selectUnit('hour', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
        <div class="nmorph-time-picker__separator">:</div>
        <div class="nmorph-time-picker__column" role="listbox" aria-label="Minutes">
          <button
            v-for="option in minuteOptions"
            :key="option.value"
            type="button"
            class="nmorph-time-picker__option"
            :class="{ 'nmorph-time-picker__option--active': option.value === pickerValue.minute }"
            :disabled="option.disabled"
            @click="selectUnit('minute', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
        <template v-if="props.showSeconds">
          <div class="nmorph-time-picker__separator">:</div>
          <div class="nmorph-time-picker__column" role="listbox" aria-label="Seconds">
            <button
              v-for="option in secondOptions"
              :key="option.value"
              type="button"
              class="nmorph-time-picker__option"
              :class="{ 'nmorph-time-picker__option--active': option.value === pickerValue.second }"
              :disabled="option.disabled"
              @click="selectUnit('second', option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </template>
      </div>
    </NmorphDropdown>
  </div>
</template>

<style lang="scss">
.nmorph-time-picker {
  --width: 160px;

  position: relative;
  width: var(--width);
  height: var(--height);

  .nmorph-time-picker__input {
    display: flex;
    align-items: center;
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
    margin-right: 6px;
  }

  .nmorph-time-picker__selected-value {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-time-picker__clear {
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    padding: 0;
    color: var(--nmorph-text-color);
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .nmorph-time-picker__panel {
    display: grid;
    grid-template-columns: minmax(48px, 1fr) auto minmax(48px, 1fr);
    gap: 4px;
    padding: 8px;
  }

  .nmorph-time-picker__panel--with-seconds {
    grid-template-columns: minmax(48px, 1fr) auto minmax(48px, 1fr) auto minmax(48px, 1fr);
  }

  .nmorph-time-picker__column {
    display: grid;
    max-height: 220px;
    overflow-y: auto;
  }

  .nmorph-time-picker__separator {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--nmorph-semi-contrast-text-color);
    font-weight: 700;
  }

  .nmorph-time-picker__option {
    min-height: 28px;
    padding: 0 8px;
    color: var(--nmorph-text-color);
    background: transparent;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }

  .nmorph-time-picker__option:hover,
  .nmorph-time-picker__option--active {
    color: var(--nmorph-focus-text-color);
    background: var(--nmorph-accent-color);
  }

  .nmorph-time-picker__option:disabled {
    cursor: not-allowed;
    opacity: 0.35;
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
</style>
