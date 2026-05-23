<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';

type NmorphTextareaResizeType = 'none' | 'both' | 'horizontal' | 'vertical';

interface INmorphProps extends INmorphCommonInputProps {
  placeholder?: string;
  modelValue?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: NmorphTextareaResizeType;
  autoSize?: boolean;
  indentation?: string;
  textareaAttrs?: Record<string, string | number | boolean | undefined>;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  placeholder: '',
  modelValue: '',
  rows: 3,
  minRows: 2,
  maxRows: undefined,
  resize: 'vertical',
  autoSize: false,
  indentation: '12px',
  height: 'basic',
  disabled: false,
  textareaAttrs: () => ({}),
});

interface INmorphEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'on-enter'): void;
  (e: 'keydown', event: KeyboardEvent): void;
}

const emit = defineEmits<INmorphEmit>();
const { id, name, autocomplete, tabindex } = useFormItemInput(props);
const { modelValue, updateModelValue } = useFormItemModel<string>(
  props,
  (value) => emit('update:model-value', value),
  ''
);
const textareaDOMRef = ref<NmorphDomElementType>(null);
const focused = ref(false);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], focused.value && 'focused'],
    'nmorph-textarea': [props.disabled && 'disabled', props.autoSize && 'auto-size'],
  })
);

const getVerticalPadding = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
};

const resizeToContent = async () => {
  if (!props.autoSize) return;
  await nextTick();
  const element = textareaDOMRef.value as HTMLTextAreaElement | null;
  if (!element) return;
  element.style.height = 'auto';

  const style = window.getComputedStyle(element);
  const lineHeight = parseFloat(style.lineHeight) || 20;
  const maxHeight = props.maxRows ? props.maxRows * lineHeight + getVerticalPadding(element) : Infinity;
  const nextHeight = Math.min(element.scrollHeight, maxHeight);

  element.style.height = `${nextHeight}px`;
  element.style.overflowY = element.scrollHeight > maxHeight ? 'auto' : 'hidden';
};

const handleInput = (event: Event): void => {
  const target = event.target as HTMLTextAreaElement;
  updateModelValue(target.value);
  resizeToContent();
};

const handleFocus = () => {
  emit('focus');
  focused.value = true;
};

const handleBlur = () => {
  emit('blur');
  focused.value = false;
};

const focus = () => {
  textareaDOMRef.value?.focus();
};

const blur = () => {
  textareaDOMRef.value?.blur();
};

const select = () => {
  (textareaDOMRef.value as HTMLTextAreaElement | null)?.select();
};

watch(modelValue, resizeToContent);
onMounted(resizeToContent);

defineExpose({ textareaDOMRef, focus, blur, select, resizeToContent });

const minRows = computed(() => Math.max(props.minRows, 1));
const rows = computed(() => Math.max(props.rows, minRows.value));
const styles = computed<CSSProperties>(() => ({
  '--nmorph-textarea-resize': props.autoSize ? 'none' : props.resize,
  '--nmorph-textarea-indentation': props.indentation,
}));
</script>

<template>
  <div :class="modifiers" :style="styles">
    <textarea
      :id="id"
      ref="textareaDOMRef"
      :name="name"
      :autocomplete="autocomplete"
      :tabindex="tabindex"
      class="nmorph-native-input"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :value="modelValue"
      :rows="rows"
      v-bind="props.textareaAttrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="emit('keydown', $event)"
      @keyup.enter="emit('on-enter')"
    />
  </div>
</template>

<style lang="scss">
.nmorph-textarea {
  height: auto;

  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: var(--indentation-03) var(--indentation-03) var(--indentation-03) var(--nmorph-textarea-indentation);
    color: var(--nmorph-text-color);
    font: inherit;
    line-height: var(--line-height-regular);
    background: var(--nmorph-main-color);
    border: none;
    border-radius: var(--default-border-radius);
    box-shadow: var(--nmorph-shadow-inset);
    transition:
      background var(--transition-02) ease,
      box-shadow var(--transition-02) ease,
      color var(--transition-02) ease;
    resize: var(--nmorph-textarea-resize);
  }

  textarea:focus {
    color: var(--nmorph-focus-text-color);
    background: var(--nmorph-accent-color);
    outline: none;
    box-shadow: var(--nmorph-shadow-outset);
  }

  textarea:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    resize: none;
  }

  &.nmorph-textarea--auto-size textarea {
    overflow-y: hidden;
  }
}
</style>
