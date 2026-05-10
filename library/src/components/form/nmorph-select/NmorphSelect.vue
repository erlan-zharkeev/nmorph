<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { ref, computed, watch, onMounted, onUnmounted, provide, nextTick } from 'vue';
import { useVirtualList } from '@/hooks';
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
  virtual?: boolean;
  virtualItemHeight?: number;
  virtualMaxHeight?: number | string;
  virtualOverscan?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  noElementPlaceholder: '',
  valueRequired: false,
  options: () => [],
  optionsMap: () => [],
  modelValue: '',
  loading: false,
  height: 'basic',
  disabled: false,
  open: false,
  fill: false,
  optionsWidth: 'truncate',
  zIndex: undefined,
  virtual: false,
  virtualItemHeight: 0,
  virtualMaxHeight: 240,
  virtualOverscan: 5,
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

const optionsMap = computed(() => (props.options.length > 0 ? props.options : props.optionsMap));
const optionsDOMRef = ref<NmorphDomElementType>(null);
const slotDomOptions = ref<string[]>([]);
const renderedOptions = computed(() => props.options);
const virtualEnabled = computed(() => props.virtual && renderedOptions.value.length > 0);
const defaultOptionHeight = computed(() => {
  const heightMap = {
    basic: 30,
    thick: 38,
    thin: 22,
  };
  return heightMap[props.height || 'basic'];
});
const virtualItemHeight = computed(() => props.virtualItemHeight || defaultOptionHeight.value);
const virtualOverscan = computed(() => props.virtualOverscan);
const virtualList = useVirtualList(renderedOptions, {
  enabled: virtualEnabled,
  itemHeight: virtualItemHeight,
  overscan: virtualOverscan,
});
const virtualOptions = computed(() => virtualList.virtualItems.value);
const virtualSpacerStyle = computed(() => ({
  height: `${virtualList.totalHeight.value}px`,
}));
const virtualContentStyle = computed(() => ({
  transform: `translateY(${virtualList.offsetTop.value}px)`,
}));
const getCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const virtualMaxHeight = computed(() => getCssSize(props.virtualMaxHeight));
const refreshDomOptions = () => {
  if (optionsMap.value.length > 0 || !optionsDOMRef.value) return;
  slotDomOptions.value = Array.from(optionsDOMRef.value.querySelectorAll('.nmorph-select-option'))
    .map((option) => option.getAttribute('value'))
    .filter((value): value is string => Boolean(value));
};
const domOptions = computed(() =>
  optionsMap.value.length > 0 ? optionsMap.value.map((option) => option.value) : slotDomOptions.value
);
const nativeOptions = computed(() => {
  if (!virtualEnabled.value) return domOptions.value;
  if (Array.isArray(initialValue.value)) return initialValue.value;
  return initialValue.value ? [initialValue.value] : [];
});

const currentIndex = ref(0);
const currentFocusedEl = computed(() => domOptions.value[currentIndex.value] || '');

watch(currentIndex, (newValue) => {
  if (open.value && virtualEnabled.value) {
    virtualList.scrollToIndex(newValue);
  }
});

watch(
  domOptions,
  (options) => {
    if (currentIndex.value >= options.length) {
      currentIndex.value = Math.max(options.length - 1, 0);
    }
  },
  { immediate: true }
);

watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  refreshDomOptions();
  if (typeof initialValue.value === 'string') {
    const selectedIndex = domOptions.value.indexOf(initialValue.value);
    if (selectedIndex !== -1) currentIndex.value = selectedIndex;
  }
  virtualList.refresh();
  if (virtualEnabled.value) virtualList.scrollToIndex(currentIndex.value);
});

onMounted(async () => {
  await nextTick();
  refreshDomOptions();
  document.addEventListener('click', closeHandler);
});

onUnmounted(() => {
  document.removeEventListener('click', closeHandler);
});

const selectedValueTitle = computed(() => {
  if (typeof initialValue.value === 'string') {
    if (initialValue.value === '') return computedNoElementPlaceholder.value;
    return optionsMap.value.find((option) => option.value === initialValue.value)?.label;
  }
  return optionsMap.value.find((option) => option.value === initialValue.value)?.label;
});

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
  if (domOptions.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % domOptions.value.length;
};

const arrowUpHandler = () => {
  if (disabledInput.value) return;
  if (domOptions.value.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + domOptions.value.length) % domOptions.value.length;
};

const enterHandler = () => {
  if (!open.value) return;
  if (!currentFocusedEl.value) return;
  changeHandler(currentFocusedEl.value);
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-select__content">
      <select
        :id="id"
        :name="name"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :disabled="disabledInput"
        @focus="focusHandler"
        @blur="blurHandler"
        @keydown.space="spaceHandler"
        @keydown.arrow-down="arrowDownHandler"
        @keydown.arrow-up="arrowUpHandler"
        @keydown.enter="enterHandler"
      >
        <option v-for="option in nativeOptions" :key="option" :value="option" />
      </select>
      <div ref="nmorphSelectDOMRef" class="nmorph-select__selected-values-line" @click.stop="clickHandler">
        <div v-if="typeof initialValue === 'string'" class="nmorph-select__selected-value">
          {{ selectedValueTitle }}
        </div>
        <div v-else-if="initialValue.length === 0" class="nmorph-select__selected-value">
          {{ computedNoElementPlaceholder }}
        </div>
        <div v-else class="nmorph-select__selected-value">
          <NmorphTagItem
            v-for="tag in tags"
            :key="tag.value"
            v-bind="tag"
            transparent
            :removable="tags.length > 1 || !props.valueRequired"
            height="thin"
            @close="changeHandler"
          />
        </div>
        <NmorphIcon class="nmorph-select__chevron">
          <NmorphIconLoader v-if="props.loading" />
          <NmorphIconChevronDown v-else />
        </NmorphIcon>
      </div>
    </div>
    <NmorphDropdown
      v-if="nmorphSelectDOMRef && !props.disabled"
      :open="open && !props.loading"
      :relative-element="nmorphSelectDOMRef"
      :fill-width="!autoOptionsWidth"
      :width="autoOptionsWidth ? 'max-content' : undefined"
      :min-width="optionsMinWidth"
      max-width="calc(100vw - 16px)"
      :z-index="props.zIndex"
      @on-outside-click="closeHandler"
    >
      <div ref="optionsDOMRef" class="nmorph-select__options">
        <NmorphIcon v-if="props.loading" class="nmorph-select__chevron" size="medium">
          <NmorphIconChevronDown />
        </NmorphIcon>
        <div
          v-else-if="virtualEnabled"
          :ref="virtualList.containerRef"
          class="nmorph-select__virtual-list"
          :style="{ maxHeight: virtualMaxHeight }"
          @scroll="virtualList.scrollHandler"
        >
          <div class="nmorph-select__virtual-spacer" :style="virtualSpacerStyle">
            <div class="nmorph-select__virtual-content" :style="virtualContentStyle">
              <NmorphSelectOption
                v-for="virtualOption in virtualOptions"
                :key="virtualOption.index"
                v-bind="virtualOption.item"
                :focused="virtualOption.item.value === currentFocusedEl"
                :height="props.height"
              />
            </div>
          </div>
        </div>
        <template v-else>
          <NmorphSelectOption
            v-for="option in options"
            :key="option.value"
            v-bind="option"
            :focused="option.value === currentFocusedEl"
            :height="props.height"
          />
          <slot />
        </template>
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
    background: var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-select__selected-values-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: var(--indentation-00) var(--default-indentation-input);
    border-radius: var(--default-border-radius);
  }

  .nmorph-select__selected-value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  select,
  option {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    border: none;
    opacity: 0;
  }

  &.nmorph-select--loading {
    .nmorph-select__options {
      display: flex;
      justify-content: center;
      padding: 16px;
    }
  }

  &.nmorph-select--disabled {
    cursor: not-allowed;
    opacity: 0.6;
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

  .nmorph-select__virtual-list {
    overflow-y: auto;
  }

  .nmorph-select__virtual-spacer {
    position: relative;
  }

  .nmorph-select__virtual-content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  &.nmorph-select--open {
    .nmorph-select__chevron {
      transform: rotate(180deg);
    }

    .nmorph-select__content {
      background: var(--nmorph-main-color);
      box-shadow:
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph-select--selected-line-outset {
    .nmorph-select__content {
      background: var(--nmorph-main-color);
      box-shadow:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph-select--focus {
    outline: 2px solid var(--nmorph-accent-color);

    .nmorph-select__content {
      box-shadow: none;
    }
  }
}
</style>
