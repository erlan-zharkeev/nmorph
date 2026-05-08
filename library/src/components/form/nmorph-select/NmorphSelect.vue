<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { disabled, ellipsis, focusOutline, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import { ref, computed, watch, onMounted, onUnmounted, provide, nextTick } from 'vue';
import {
  NmorphTagItem,
  NmorphIcon,
  NmorphSelectOption,
  NmorphDropdown,
  NmorphSelectSelectedValueInjectionType,
  NmorphSelectChangeSelectedValue,
  NmorphSelectModelValueType,
  INmorphSelectOption,
  NmorphIconLoader,
  NmorphIconChevronDown,
} from '@/components';
import { useI18n } from 'vue-i18n';
import { styled, css } from '@vue-styled-components/core'
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

const { t } = useI18n();

interface INmorphProps extends INmorphCommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: INmorphSelectOption[];
  optionsMap?: INmorphSelectOption[];
  modelValue?: NmorphSelectModelValueType;
  loading?: boolean;
  open?: boolean;
  fill?: boolean;
  optionsWidth?: 'truncate' | 'auto';
  zIndex?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  noElementPlaceholder: '',
  valueRequired: false,
  options: () => [],
  optionsMap: () => [],
  modelValue: '',
  loading: false,
  height: 'default',
  disabled: false,
  open: false,
  fill: false,
  optionsWidth: 'truncate',
});

const computedNoElementPlaceholder = computed(() =>
  props.noElementPlaceholder ? props.noElementPlaceholder : t('noElementPlaceholder')
);

const emit = defineEmits<{
  (e: 'update:model-value', val: NmorphSelectModelValueType): void;
}>();

const initialValue = ref<NmorphSelectModelValueType>(props.modelValue);
const open = ref(props.open);
const disabledInput = computed(() => props.disabled || props.loading);
const autoOptionsWidth = computed(() => props.optionsWidth === 'auto');

const optionsDOMRef = ref<NmorphDomElementType>(null);
const optionsHeight = ref<string | null>(null);
const selectedLineOutset = ref(true);

const { id, name, autocomplete, tabindex } = useFormItemInput(props);

const changeHandler = (value: string) => {
  if (disabledInput.value) return;
  open.value = false;
  if (typeof initialValue.value === 'string') {
    if (!props.valueRequired && initialValue.value === value) initialValue.value = '';
    else initialValue.value = value;
    emit('update:model-value', initialValue.value);
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
  emit('update:model-value', initialValue.value);
};

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
    'nmorph-select': [
      `${props.disabled && 'disabled'}`,
      `${props.modelValue ? 'on' : 'off'}`,
      `${props.loading && 'loading'}`,
      `${open.value && !disabledInput.value && 'open'}`,
      `${props.fill && 'fill'}`,
      `${autoOptionsWidth.value && 'options-auto-width'}`,
      `${selectedLineOutset.value ? 'selected-line-outset' : 'selected-line-inset'}`,
      `${focus.value && 'focus'}`,
    ],
  })
);

const clickHandler = () => {
  if (disabledInput.value) return;
  open.value = !open.value;
};

watch(
  open,
  (newValue) => {
    if (newValue) selectedLineOutset.value = false;
  },
  { immediate: true }
);

const closeHandler = () => {
  open.value = false;
};

watch(
  () => props.loading,
  (isLoading) => {
    if (isLoading) open.value = false;
  }
);

const nodeOptions = ref<NodeListOf<Element>>();
const domOptions = ref<Array<string>>([]);

const currentIndex = ref(0);
const currentFocusedEl = ref('');

watch(currentIndex, (newValue) => {
  currentFocusedEl.value = domOptions.value[newValue];
  nodeOptions.value.forEach((nodeOption) => {
    const elementValue = nodeOption.getAttribute('value');
    const action = elementValue === currentFocusedEl.value ? 'add' : 'remove';
    nodeOption.classList[action]('nmorph-select-option--focused');
  });
});

onMounted(async () => {
  await nextTick();
  if (!optionsDOMRef.value) return;

  nodeOptions.value = optionsDOMRef.value.querySelectorAll('.nmorph-select-option');
  nodeOptions.value.forEach((el) => {
    const element = el.getAttribute('value');
    if (element) domOptions.value.push(element);
  });

  currentFocusedEl.value = domOptions.value[currentIndex.value];

  optionsHeight.value = `${optionsDOMRef.value.clientHeight}px`;
  document.addEventListener('click', closeHandler);
});

onUnmounted(() => {
  document.removeEventListener('click', closeHandler);
});

const selectedValueTitle = computed(() => {
  if (typeof initialValue.value === 'string') {
    if (initialValue.value === '') return computedNoElementPlaceholder.value;
    return props.options.find((option) => option.value === initialValue.value)?.label;
  }
  return props.options.find((option) => option.value === initialValue.value)?.label;
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
const optionsMinWidth = computed(() =>
  autoOptionsWidth.value ? `${nmorphSelectDOMRef.value?.clientWidth || 0}px` : undefined
);

const spaceHandler = () => {
  if (disabledInput.value) return;
  open.value = !open.value;
};

const arrowDownHandler = () => {
  if (disabledInput.value) return;
  currentIndex.value = (currentIndex.value + 1) % domOptions.value.length;
};

const arrowUpHandler = () => {
  if (disabledInput.value) return;
  currentIndex.value = (currentIndex.value - 1 + domOptions.value.length) % domOptions.value.length;
};

const enterHandler = () => {
  if (!open.value) return;
  changeHandler(currentFocusedEl.value);
};

const commonCSS = css`
  --base-width: 200px;

  width: var(--base-width);
  height: var(--height);
  cursor: pointer;

  .nmorph-select__content {
    position: relative;
    height: 100%;
    ${nmorphOutset()}
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
    ${ellipsis()}
  }

  select,
  option {
    opacity: 0;
    width: 0;
    height: 0;
    border: none;
    padding: 0;
    position: absolute;
  }

  &.nmorph-select--loading {
    .nmorph-select__options {
      display: flex;
      justify-content: center;
      padding: 16px;
    }
  }

  &.nmorph-select--disabled {
    ${disabled()}
  }

  &.nmorph-select--fill {
    width: 100%;
  }

  &.nmorph-select--options-auto-width {
    .nmorph-select__options {
      width: max-content;
      max-width: calc(100vw - var(--indentation-02) * 2);
    }
  }

  &.nmorph-select--open {
    .nmorph-select__chevron {
      transform: rotate(180deg);
    }

    .nmorph-select__content {
      ${nmorphInset()}
    }
  }

  &.nmorph-select--selected-line-outset {
    .nmorph-select__content {
      ${nmorphOutset()}
    }
  }

  &.nmorph-select--focus {
    ${focusOutline()}

    .nmorph-select__content {
      box-shadow: none;
    }
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <div class="nmorph-select__content">
      <select :id="id" :name="name" :autocomplete="autocomplete" :tabindex="tabindex" :disabled="disabledInput" @focus="focusHandler" @blur="blurHandler" @keydown.space="spaceHandler"
        @keydown.arrow-down="arrowDownHandler" @keydown.arrow-up="arrowUpHandler" @keydown.enter="enterHandler">
        <option v-for="option in domOptions" :key="option" :value="option" />
      </select>
      <div ref="nmorphSelectDOMRef" class="nmorph-select__selected-values-line" @click.stop="clickHandler">
        <div v-if="typeof initialValue === 'string'" class="nmorph-select__selected-value">
          {{ selectedValueTitle }}
        </div>
        <div v-else-if="initialValue.length === 0" class="nmorph-select__selected-value">
          {{ computedNoElementPlaceholder }}
        </div>
        <div v-else class="nmorph-select__selected-value">
          <NmorphTagItem v-for="tag in tags" :key="tag.value" v-bind="tag" transparent
            :removable="tags.length > 1 || !props.valueRequired" height="thin" @close="changeHandler" />
        </div>
        <NmorphIcon class="nmorph-select__chevron">
          <NmorphIconLoader v-if="props.loading" />
          <NmorphIconChevronDown v-else />
        </NmorphIcon>
      </div>
    </div>
    <NmorphDropdown v-if="nmorphSelectDOMRef && !props.disabled" :open="open && !props.loading"
      :relative-element="nmorphSelectDOMRef" :fill-width="!autoOptionsWidth"
      :width="autoOptionsWidth ? 'max-content' : undefined" :min-width="optionsMinWidth"
      max-width="calc(100vw - 16px)" :z-index="props.zIndex"
      @on-outside-click="closeHandler">
      <div ref="optionsDOMRef" class="nmorph-select__options">
        <NmorphIcon v-if="props.loading" class="nmorph-select__chevron" size="medium">
          <NmorphIconChevronDown />
        </NmorphIcon>
        <NmorphSelectOption v-else v-for="option in options" :key="option.value" v-bind="option"
          :height="props.height" />
        <slot />
      </div>
    </NmorphDropdown>
  </StyledComponent>
</template>
