<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { body1, body2, body3, disabled, ellipsis, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import { computed, onMounted, ref, watch } from 'vue';
import { styled, css } from '@vue-styled-components/core';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: string;
  showValue?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  disabled: false,
  height: 'default',
  showValue: false,
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

onMounted(() => {
  if (!props.modelValue) {
    currentValue.value = resolveAccentColor();
  }
});

defineExpose({ inputDOMRef });

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${focused.value && 'focused'}`],
    'nmorph-color-picker': [`${props.disabled && 'disabled'}`],
  })
);

const displayValue = computed(() => currentValue.value.toUpperCase());

const commonCSS = css`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  max-width: 100%;

  .nmorph-color-picker__content {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--indentation-03);
    width: fit-content;
    max-width: 100%;
    height: var(--height);
    padding: 0 var(--default-indentation-input);
    border-radius: var(--default-border-radius);
    transition:
      background var(--transition-01) ease-in-out,
      box-shadow var(--transition-01) ease-in-out;

    ${nmorphInset()}
  }

  .nmorph-color-picker__native {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .nmorph-color-picker__swatch {
    width: calc(var(--height) - var(--indentation-03));
    height: calc(var(--height) - var(--indentation-03));
    border-radius: var(--default-border-radius);
    flex: 0 0 auto;
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 0.25),
      0 0 0 1px rgb(0 0 0 / 0.12);
  }

  .nmorph-color-picker__value {
    ${body2()}
    ${ellipsis()}

    min-width: 0;
    user-select: none;
  }

  &.nmorph--thin-component {
    .nmorph-color-picker__value {
      ${body3()}
    }
  }

  &.nmorph--thick-component {
    .nmorph-color-picker__value {
      ${body1()}
    }
  }

  &.nmorph--focused {
    .nmorph-color-picker__content {
      ${nmorphOutset()}

      background: var(--nmorph-accent-color);
    }

    .nmorph-color-picker__value {
      color: var(--nmorph-focus-text-color);
    }
  }

  &.nmorph-color-picker--disabled {
    ${disabled()}

    .nmorph-color-picker__content {
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
  </StyledComponent>
</template>
