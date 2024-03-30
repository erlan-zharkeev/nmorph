<script setup lang="ts">
import { NmorphCommonInputProps, NmorphComponentHeight, NmorphDomElement } from '@/types/common';
import { getModifiers } from '@/utils';
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue';
import { ISelectOption } from '../nmorph-select-option/NmorphSelectOption.vue';
import { SelectModelValue } from '../nmorph-select-option/types';
import { NmorphTag, NmorphIcon, NmorphSelectOption } from '@/components';
import { usePlacement } from '@/hooks';

interface IProps extends NmorphCommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: ISelectOption[];
  optionsMap?: ISelectOption[];
  modelValue?: SelectModelValue;
  loading?: boolean;
  open?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
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
  (e: 'update:modelValue', val: SelectModelValue): void;
}>();

const initialValue = ref<SelectModelValue>(props.modelValue);
const open = ref(props.open);

const optionsWrapperDOMRef = ref<NmorphDomElement>(null);
const optionsDOMRef = ref<NmorphDomElement>(null);
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

const { placement, adjustPlacement } = usePlacement({
  initialPlacement: 'bottom',
  targetDomElement: optionsDOMRef,
  blockPosition: false,
});

const modifiers = computed(() =>
  getModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-select': [
      placement.value,
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

const optionTransitionendHandler = () => {
  if (open.value) return;
  selectedLineOutset.value = true;
};

const closeHandler = () => {
  open.value = false;
};

onMounted(() => {
  adjustPlacement();
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

provide('select-selected-value', initialValue);
provide('select-change-selected-value', changeHandler);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-select__content">
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
            :removable="tags.length > 1 || !props.valueRequired"
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
          <NmorphSelectOption v-for="option in options" :key="option.value" v-bind="option" :height="props.height" />
          <slot name="default" />
        </div>
      </div>
    </div>
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
    padding: var(--indentation-00) var(--default-indentation-input);
    border-radius: var(--default-border-radius);

    @include nmorph-outset;
  }

  .nmorph-select__selected-values-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .nmorph-select__selected-value {
    @include ellipsis;
  }

  .nmorph-select__options-wrapper {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 0;
    overflow: hidden;
    border-radius: var(--default-border-radius);
    transition: ease-in-out height var(--transition-02);

    @include nmorph-outset;

    .nmorph-select__option {
      padding: var(--indentation-03);
    }

    .nmorph-select__chevron {
      transition: ease-in-out transform var(--transition-02);
    }
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

.nmorph-select--selected-line-inset {
  .nmorph-select__content {
    @include nmorph-inset;
  }
}

.nmorph-select--top {
  .nmorph-select__options-wrapper {
    bottom: 100%;
  }
}
</style>
