<script setup lang="ts">
import { disabled, useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphComponentHeight } from '@/types';
import { computed, nextTick, ref, watch } from 'vue';
import { styled, css } from '@vue-styled-components/core';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';
import NmorphTextInput from '../nmorph-text-input/NmorphTextInput.vue';

type NmorphOtpInputMode = 'numeric' | 'text' | 'alphanumeric';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: string;
  length?: number;
  mode?: NmorphOtpInputMode;
  autofocus?: boolean;
  autocapitalize?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  length: 6,
  mode: 'numeric',
  autofocus: false,
  autocapitalize: 'none',
  height: 'basic',
  disabled: false,
});

interface INmorphEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'complete', val: string): void;
}

interface INmorphTextInputExpose {
  inputDOMRef?: HTMLInputElement | null;
  focus?: () => void;
  blur?: () => void;
  select?: () => void;
}

const emit = defineEmits<INmorphEmit>();

const { id, name, autocomplete, tabindex } = useFormItemInput(props);

const inputRefs = ref<Array<INmorphTextInputExpose | null>>([]);
const inputDOMRefs = ref<Array<HTMLInputElement | null>>([]);
const focused = ref(false);
const otpValue = ref<string[]>([]);

const normalizedLength = computed(() => Math.max(1, props.length));

const sanitizeValue = (value = '') => {
  const source = `${value ?? ''}`;

  if (props.mode === 'numeric') {
    return Array.from(source.replace(/\D/g, ''));
  }

  if (props.mode === 'alphanumeric') {
    return Array.from(source.replace(/[^a-zA-Z0-9]/g, ''));
  }

  return Array.from(source);
};

const normalizeOtpValue = (value = props.modelValue) => {
  const sanitizedValue = sanitizeValue(value).slice(0, normalizedLength.value);

  return Array.from({ length: normalizedLength.value }, (_, index) => sanitizedValue[index] || '');
};

const syncOtpValue = (value: string[], emitEvents = false) => {
  otpValue.value = Array.from({ length: normalizedLength.value }, (_, index) => value[index] || '');

  if (!emitEvents) return;

  const joinedValue = otpValue.value.join('');
  emit('update:model-value', joinedValue);

  if (!otpValue.value.includes('')) {
    emit('complete', joinedValue);
  }
};

watch(
  [() => props.modelValue, () => props.mode, normalizedLength],
  () => {
    const nextValue = normalizeOtpValue(props.modelValue);

    if (nextValue.join('') !== otpValue.value.join('') || nextValue.length !== otpValue.value.length) {
      syncOtpValue(nextValue);
    }
  },
  { immediate: true }
);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${focused.value && 'focused'}`],
    'nmorph-otp-input': [`${props.disabled && 'disabled'}`],
  })
);

const fieldIds = computed(() =>
  Array.from({ length: normalizedLength.value }, (_, index) => (index === 0 ? id.value : `${id.value}-${index + 1}`))
);

const inputMode = computed(() => (props.mode === 'numeric' ? 'numeric' : 'text'));
const resolvedAutocomplete = computed(() => autocomplete.value || 'one-time-code');
const inputPattern = computed(() => {
  if (props.mode === 'numeric') return '[0-9]*';
  if (props.mode === 'alphanumeric') return '[A-Za-z0-9]*';

  return undefined;
});

const syncInputDOMRef = (index: number) => {
  inputDOMRefs.value[index] = inputRefs.value[index]?.inputDOMRef ?? null;
};

const setInputRef = (element: unknown, index: number) => {
  inputRefs.value[index] = element as INmorphTextInputExpose | null;
  nextTick(() => {
    syncInputDOMRef(index);
  });
};

const selectField = (index: number) => {
  syncInputDOMRef(index);
  const target = inputRefs.value[index];

  target?.select?.();
  inputDOMRefs.value[index]?.select();
};

const focusField = (index = 0) => {
  nextTick(() => {
    const targetIndex = Math.min(Math.max(index, 0), normalizedLength.value - 1);
    syncInputDOMRef(targetIndex);
    const target = inputRefs.value[targetIndex];

    target?.focus?.();
    inputDOMRefs.value[targetIndex]?.focus();
    selectField(targetIndex);
  });
};

const blurFields = () => {
  inputRefs.value.forEach((input, index) => {
    input?.blur?.();
    inputDOMRefs.value[index]?.blur();
  });
};

defineExpose({
  inputDOMRefs,
  focus: focusField,
  blur: blurFields,
});

const updateCharAt = (index: number, value = '') => {
  const nextValue = [...otpValue.value];
  nextValue[index] = value;
  syncOtpValue(nextValue, true);
};

const insertValue = (value: string, startIndex: number) => {
  const chars = sanitizeValue(value).slice(0, normalizedLength.value - startIndex);

  if (!chars.length) {
    updateCharAt(startIndex, '');
    return;
  }

  const nextValue = [...otpValue.value];
  chars.forEach((char, offset) => {
    nextValue[startIndex + offset] = char;
  });

  syncOtpValue(nextValue, true);

  const nextIndex = startIndex + chars.length;
  if (nextIndex < normalizedLength.value) {
    focusField(nextIndex);
  } else {
    focusField(normalizedLength.value - 1);
  }
};

const inputHandler = (value: string, index: number) => {
  insertValue(value, index);
};

const backspaceHandler = (index: number) => {
  if (otpValue.value[index]) {
    updateCharAt(index);
    return;
  }

  if (index > 0) {
    updateCharAt(index - 1);
    focusField(index - 1);
  }
};

const deleteKeyHandler = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace') {
    backspaceHandler(index);
    return;
  }

  updateCharAt(index);
};

const arrowLeftHandler = (index: number) => {
  focusField(index - 1);
};

const arrowRightHandler = (index: number) => {
  focusField(index + 1);
};

const homeHandler = () => {
  focusField(0);
};

const endHandler = () => {
  focusField(normalizedLength.value - 1);
};

const keydownHandler = (event: KeyboardEvent) => {
  if (event.key.length === 1 && !sanitizeValue(event.key).length) {
    event.preventDefault();
  }
};

const pasteHandler = (event: ClipboardEvent, index: number) => {
  const value = event.clipboardData?.getData('text') || '';
  insertValue(value, index);
};

const focusHandler = (index: number) => {
  if (!focused.value) {
    focused.value = true;
    emit('focus');
  }

  selectField(index);
};

const blurHandler = () => {
  setTimeout(() => {
    const activeElement = document.activeElement;
    const stillFocused = inputDOMRefs.value.some((input) => input === activeElement);

    if (!stillFocused && focused.value) {
      focused.value = false;
      emit('blur');
    }
  });
};

const getFieldTabindex = (index: number) => (tabindex.value > 0 ? tabindex.value + index : tabindex.value);

watch(
  () => props.autofocus,
  (autofocus) => {
    if (autofocus && !props.disabled) {
      focusField(0);
    }
  },
  { immediate: true }
);

const commonCSS = css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  .nmorph-otp-input__content {
    display: flex;
    gap: var(--indentation-02);
  }

  .nmorph-otp-input__field {
    flex: 0 0 auto;
    width: 44px;
    min-width: 44px;
  }

  .nmorph-otp-input__field input {
    padding: 0;
    text-align: center;
    text-indent: 0;
    font-variant-numeric: tabular-nums;
  }

  &.nmorph--thin-component {
    .nmorph-otp-input__field {
      width: 32px;
      min-width: 32px;
    }
  }

  &.nmorph--thick-component {
    .nmorph-otp-input__field {
      width: 52px;
      min-width: 52px;
    }
  }

  &.nmorph-otp-input--disabled {
    ${disabled()}
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers">
    <input :name="name" :value="otpValue.join('')" type="hidden" :disabled="props.disabled" />
    <div class="nmorph-otp-input__content">
      <NmorphTextInput
        v-for="(_, index) in otpValue"
        :id="fieldIds[index]"
        :key="fieldIds[index]"
        :ref="(element) => setInputRef(element, index)"
        class="nmorph-otp-input__field"
        :model-value="otpValue[index]"
        :height="props.height"
        :disabled="props.disabled"
        :autocomplete="resolvedAutocomplete"
        :tabindex="getFieldTabindex(index)"
        indentation="0px"
        :input-attrs="{
          name: undefined,
          maxlength: 1,
          inputmode: inputMode,
          pattern: inputPattern,
          autocapitalize: props.autocapitalize,
          spellcheck: false,
          autofocus: props.autofocus && index === 0,
          'aria-label': `OTP ${index + 1}`,
        }"
        @update:model-value="inputHandler($event, index)"
        @keydown="keydownHandler($event)"
        @keydown.delete.prevent="deleteKeyHandler($event, index)"
        @keydown.left.prevent="arrowLeftHandler(index)"
        @keydown.right.prevent="arrowRightHandler(index)"
        @keydown.home.prevent="homeHandler"
        @keydown.end.prevent="endHandler"
        @paste.prevent="pasteHandler($event, index)"
        @focus="focusHandler(index)"
        @blur="blurHandler"
      />
    </div>
  </StyledComponent>
</template>
