<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, onMounted, ref, watch } from 'vue';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: string;
  showValue?: boolean;
  displayFormat?: 'hex' | 'rgb' | 'hsl';
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  disabled: false,
  height: 'basic',
  showValue: false,
  displayFormat: 'hex',
});

const emit = defineEmits<{
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const { id, name, tabindex } = useFormItemInput(props);

const normalizeColor = (value?: string, fallback = '#000000') => {
  const currentValue = value?.trim() || '';

  if (/^#[\da-f]{6}$/i.test(currentValue)) {
    return currentValue.toLowerCase();
  }

  if (/^#[\da-f]{3}$/i.test(currentValue)) {
    return `#${currentValue
      .slice(1)
      .split('')
      .map((symbol) => `${symbol}${symbol}`)
      .join('')
      .toLowerCase()}`;
  }

  return fallback;
};

const inputDOMRef = ref<NmorphDomElementType>(null);
const resolveAccentColor = () => {
  if (typeof document === 'undefined') return '#006cb6';

  const host = inputDOMRef.value || document.documentElement;
  const accentColor = getComputedStyle(host).getPropertyValue('--nmorph-accent-color').trim();
  return normalizeColor(accentColor, '#006cb6');
};

const currentValue = ref(normalizeColor(props.modelValue));
const focused = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    currentValue.value = newValue ? normalizeColor(newValue) : resolveAccentColor();
  }
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const nextValue = normalizeColor(target.value);

  currentValue.value = nextValue;
  emit('update:model-value', nextValue);
};

const hexToRgb = (hex: string) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const formatRgb = (hex: string) => {
  const [red, green, blue] = hexToRgb(hex);
  return `rgb(${red}, ${green}, ${blue})`;
};

const formatHsl = (hex: string) => {
  const [red, green, blue] = hexToRgb(hex).map((value) => value / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return `hsl(0, 0%, ${Math.round(lightness * 100)}%)`;
  }

  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return `hsl(${Math.round(hue * 60)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;
};

onMounted(() => {
  if (!props.modelValue) {
    currentValue.value = resolveAccentColor();
  }
});

defineExpose({ inputDOMRef });

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], focused.value && 'focused'],
    'nmorph-color-picker': [props.disabled && 'disabled', props.displayFormat],
  })
);

const displayValue = computed(() => {
  if (props.displayFormat === 'rgb') return formatRgb(currentValue.value);
  if (props.displayFormat === 'hsl') return formatHsl(currentValue.value);
  return currentValue.value.toUpperCase();
});
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-color-picker__content">
      <input
        :id="id"
        ref="inputDOMRef"
        :name="name"
        :tabindex="tabindex"
        class="nmorph-color-picker__native nmorph-native-input"
        type="color"
        :value="currentValue"
        :disabled="props.disabled"
        @input="handleInput"
        @focus="
          focused = true;
          emit('focus');
        "
        @blur="
          focused = false;
          emit('blur');
        "
      />
      <div class="nmorph-color-picker__swatch" :style="{ background: currentValue }" />
      <span v-if="props.showValue" class="nmorph-color-picker__value">{{ displayValue }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-color-picker {
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  max-width: 100%;

  .nmorph-color-picker__content {
    position: relative;
    display: inline-flex;
    gap: var(--indentation-03);
    align-items: center;
    width: fit-content;
    max-width: 100%;
    height: var(--height);
    padding: 0 var(--default-indentation-input);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-color-picker__native {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    inset: 0;
  }

  .nmorph-color-picker__swatch {
    flex: 0 0 auto;
    width: calc(var(--height) - var(--indentation-03));
    height: calc(var(--height) - var(--indentation-03));
    border-radius: var(--default-border-radius);
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 25%),
      0 0 0 1px rgb(0 0 0 / 12%);
  }

  .nmorph-color-picker__value {
    flex: 0 0 7ch;
    width: 7ch;
    min-width: 7ch;
    overflow: hidden;
    font-weight: 400;
    font-size: var(--font-size-small);
    font-family: monospace;
    line-height: var(--line-height-regular);
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: none;
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum';
  }

  &.nmorph-color-picker--rgb {
    .nmorph-color-picker__value {
      flex-basis: 18ch;
      width: 18ch;
      min-width: 18ch;
    }
  }

  &.nmorph-color-picker--hsl {
    .nmorph-color-picker__value {
      flex-basis: 20ch;
      width: 20ch;
      min-width: 20ch;
    }
  }

  &.nmorph--thin-component {
    .nmorph-color-picker__value {
      font-weight: 400;
      font-size: var(--font-size-extra-small);
      line-height: var(--line-height-regular);
    }
  }

  &.nmorph--thick-component {
    .nmorph-color-picker__value {
      font-weight: 400;
      font-size: var(--font-size-base);
      line-height: var(--line-height-regular);
    }
  }

  &.nmorph--focused {
    .nmorph-color-picker__content {
      background: var(--nmorph-accent-color);
      box-shadow:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }

    .nmorph-color-picker__value {
      color: var(--nmorph-focus-text-color);
    }
  }

  &.nmorph-color-picker--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-color-picker__content {
      pointer-events: none;
    }
  }
}
</style>
