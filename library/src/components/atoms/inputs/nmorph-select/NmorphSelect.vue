<script setup lang="ts">
import { CommonInputProps } from './../../../common-component.enums';
import { createModifiers } from './../../../../utils';
import { computed, onMounted, ref, provide, watch, onUnmounted } from 'vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import NmorphTag from './../../nmorph-tag/NmorphTag.vue';
import NmorphSelectOption, { ISelectOption } from './../nmorph-select-option/NmorphSelectOption.vue';
import { SelectModelValue } from '../nmorph-select-option/types';

interface IProps extends CommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: ISelectOption[];
  modelValue?: SelectModelValue;
  loading?: boolean;
  open?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  noElementPlaceholder: 'Choose value',
  valueRequired: false,
  options: () => [],
  modelValue: '',
  loading: true,
  fill: false,
  height: 'default',
  disabled: false,
  open: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: SelectModelValue): void;
}>();

const initialValue = ref<SelectModelValue>(props.modelValue);
const open = ref(props.open);

const optionsWrapperDOMRef = ref<HTMLElement | null>(null);
const optionsDOMRef = ref<HTMLElement | null>(null);
const optionsHeight = ref<string | null>(null);
const selectedLineOutset = ref(true);

const changeHandler = (value: string) => {
  if (props.disabled) return;
  open.value = false;
  if (typeof initialValue.value === 'string') {
    if (!props.valueRequired && initialValue.value === value) initialValue.value = '';
    else initialValue.value = value;
    emit('update:modelValue', initialValue.value);
  }
  if (Array.isArray(initialValue.value)) {
    const hasValue = initialValue.value.includes(value);
    const currentValueIsLast = initialValue.value.length === 1 && hasValue;
    if (props.valueRequired && currentValueIsLast) return;
    if (!hasValue) {
      initialValue.value = [...initialValue.value, value];
    } else {
      initialValue.value = initialValue.value.filter((currentValue) => currentValue !== value);
    }
  }
  emit('update:modelValue', initialValue.value);
};

const modifiers = computed(() =>
  createModifiers('nmorph-select', [
    props.disabled ? 'disabled' : '',
    props.modelValue ? 'on' : 'off',
    props.loading ? 'loading' : '',
    props.fill ? 'fill' : '',
    open.value ? 'open' : '',
    selectedLineOutset.value ? 'selected-line-outset' : 'selected-line-inset',
    props.height,
  ])
);

const clickHandler = () => {
  open.value = !open.value;
};

watch(open, (newValue) => {
  if (newValue) selectedLineOutset.value = false;
});

const optionTransitionendHandler = () => {
  if (open.value) return;
  selectedLineOutset.value = true;
};

const closeHandler = () => {
  open.value = false;
};

onMounted(() => {
  if (!optionsDOMRef.value) return;
  optionsHeight.value = `${optionsDOMRef.value.clientHeight}px`;
  optionsWrapperDOMRef.value?.addEventListener('transitionend', optionTransitionendHandler);
  document.addEventListener('click', closeHandler);
});

onUnmounted(() => {
  optionsWrapperDOMRef.value?.removeEventListener('transitionend', optionTransitionendHandler);
  document.removeEventListener('click', closeHandler);
});

const selectedValueTitle = computed(() => {
  if (typeof initialValue.value === 'string') {
    if (initialValue.value === '') return props.noElementPlaceholder;
    return props.options.find((option) => option.value === initialValue.value)?.label;
  }
  return initialValue.value;
});

const tags = computed(() =>
  props.options
    .filter((option) => initialValue.value.includes(option.value))
    .map((option) => {
      return { text: option.label, value: option.value };
    })
);

provide('select-selected-value', initialValue);
provide('select-change-selected-value', changeHandler);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-select__content">
      <select />
      <div class="nmorph-select__selected-values-line" @click.stop="clickHandler">
        <div v-if="typeof initialValue === 'string'" class="nmorph-select__selected-value">
          {{ selectedValueTitle }}
        </div>
        <div v-if="initialValue.length <= 0" class="nmorph-select__selected-value">
          {{ props.noElementPlaceholder }}
        </div>
        <div v-else class="nmorph-select__selected-value">
          <NmorphTag
            v-for="tag in tags"
            :key="tag.value"
            v-bind="tag"
            transparent
            height="thin"
            @close="changeHandler"
          />
        </div>
        <NmorphIcon name="chevron-down" class="nmorph-select__chevron" />
      </div>
      <div
        ref="optionsWrapperDOMRef"
        class="nmorph-select__options-wrapper"
        :style="{ height: open && optionsHeight ? optionsHeight : '0px' }"
      >
        <div ref="optionsDOMRef" class="nmorph-select__options">
          <NmorphSelectOption v-for="option in options" :key="option.value" v-bind="option" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-select {
  --height: #{$default-input-height};
  $chevron-rotate-transition: ease-in-out transform var(--transition-02);
  $options-expand-transition: ease-in-out height var(--transition-02);

  height: var(--height);
  cursor: pointer;
  @include body-1(var(--text-01));

  .nmorph-select__content {
    height: 100%;
    position: relative;
    padding: 0 8px;
    border-radius: var(--default-border-radius);
    @include nmorph-outset;
  }

  .nmorph-select__selected-values-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  select {
    appearance: none;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .nmorph-select__options-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    border-radius: var(--default-border-radius);
    overflow: hidden;
    height: 0;
    transition: $options-expand-transition;
    @include nmorph-outset;

    .nmorph-select__option {
      padding: 8px;
    }

    .nmorph-select__chevron {
      transition: $chevron-rotate-transition;
    }
  }
}

.nmorph-select--open {
  .nmorph-select__content {
    @include nmorph-inset;
  }

  .nmorph-select__chevron {
    transform: rotate(180deg);
  }
}

.nmorph-select--selected-line-outset {
  .nmorph-select__content {
    @include nmorph-outset;
  }
}

.nmorph-select--selected-line-inset {
  .nmorph-select__content {
    @include nmorph-inset;
  }
}
</style>
