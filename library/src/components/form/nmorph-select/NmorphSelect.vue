<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types/common';
import { useModifiers } from '@/utils';
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue';
import {
  NmorphTag,
  NmorphIcon,
  NmorphSelectOption,
  NmorphDropdown,
  NmorphSelectSelectedValueInjectionType,
  NmorphSelectChangeSelectedValue,
  NmorphSelectModelValueType,
  INmorphSelectOption,
} from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: INmorphSelectOption[];
  optionsMap?: INmorphSelectOption[];
  modelValue?: NmorphSelectModelValueType;
  loading?: boolean;
  open?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  noElementPlaceholder: 'Choose value',
  valueRequired: false,
  options: () => [],
  optionsMap: () => [],
  modelValue: '',
  loading: true,
  fill: false,
  height: 'default',
  disabled: false,
  open: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: NmorphSelectModelValueType): void;
}>();

const initialValue = ref<NmorphSelectModelValueType>(props.modelValue);
const open = ref(props.open);

const optionsDOMRef = ref<NmorphDomElementType>(null);
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
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-select': [
      `${props.disabled && 'disabled'}`,
      `${props.modelValue ? 'on' : 'off'}`,
      `${props.modelValue && 'loading'}`,
      `${open.value && 'open'}`,
      `${selectedLineOutset.value ? 'selected-line-outset' : 'selected-line-inset'}`,
    ],
  })
);

const clickHandler = () => {
  open.value = !open.value;
};

watch(open, (newValue) => {
  if (newValue) selectedLineOutset.value = false;
});

const closeHandler = () => {
  open.value = false;
};

onMounted(() => {
  if (!optionsDOMRef.value) return;
  optionsHeight.value = `${optionsDOMRef.value.clientHeight}px`;
  document.addEventListener('click', closeHandler);
});

onUnmounted(() => {
  document.removeEventListener('click', closeHandler);
});

const selectedValueTitle = computed(() => {
  if (typeof initialValue.value === 'string') {
    if (initialValue.value === '') return props.noElementPlaceholder;
    return props.options.find((option) => option.value === initialValue.value)?.label;
  }
  return initialValue.value;
});

const optionsMap = computed(() => (props.options.length > 0 ? props.options : props.optionsMap));

const tags = computed(() => {
  const haveMap = optionsMap.value.length > 0;
  if (haveMap) {
    return optionsMap.value
      .filter((option) => initialValue.value.includes(option.value))
      .map((option) => {
        return { text: option.label, value: option.value };
      });
  }
  if (Array.isArray(initialValue.value)) {
    return initialValue.value.map((option) => {
      return { text: option, value: option };
    });
  }
  return [{ text: initialValue.value, value: initialValue.value }];
});

provide<NmorphSelectSelectedValueInjectionType>('select-selected-value', initialValue);
provide<NmorphSelectChangeSelectedValue>('select-change-selected-value', changeHandler);

const nmorphSelectDOMRef = ref<NmorphDomElementType>(null);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-select__content">
      <div ref="nmorphSelectDOMRef" class="nmorph-select__selected-values-line" @click.stop="clickHandler">
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
            :removable="tags.length > 1 || !props.valueRequired"
            height="thin"
            @close="changeHandler"
          />
        </div>
        <NmorphIcon name="chevron-down" class="nmorph-select__chevron" />
      </div>
    </div>
    <NmorphDropdown
      v-if="nmorphSelectDOMRef"
      :open="open"
      :relative-element="nmorphSelectDOMRef"
      @on-outside-click="closeHandler"
    >
      <div ref="optionsDOMRef" class="nmorph-select__options">
        <NmorphSelectOption v-for="option in options" :key="option.value" v-bind="option" :height="props.height" />
        <slot />
      </div>
    </NmorphDropdown>
  </div>
</template>

<style lang="scss">
.nmorph-select {
  --base-width: 200px;

  width: var(--base-width);
  height: var(--height);
  cursor: pointer;

  .nmorph-select__content {
    position: relative;
    height: 100%;

    @include nmorph-outset;
  }

  .nmorph-select__selected-values-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: var(--indentation-00) var(--default-indentation-input);
    border-radius: var(--default-border-radius);
  }

  .nmorph-select__selected-value {
    @include ellipsis;
  }
}

.nmorph-select--open {
  .nmorph-select__chevron {
    transform: rotate(180deg);
  }

  .nmorph-select__content {
    @include nmorph-inset;
  }
}

.nmorph-select--selected-line-outset {
  .nmorph-select__content {
    @include nmorph-outset;
  }
}
</style>
./components/nmorph-select-option/NmorphSelectOption.vue./components/nmorph-select-option/types
