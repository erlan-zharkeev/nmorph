<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useVirtualList, useZIndex } from '@/hooks';
import {
  NmorphIcon,
  NmorphDropdown,
  NmorphTextInput,
  NmorphAutocompleteActionCallbackType,
  INmorphAutocompleteListItem,
  NmorphIconLoader,
} from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: string;
  placeholder?: string;
  clearable?: boolean;
  list: INmorphAutocompleteListItem[];
  actionCallback?: NmorphAutocompleteActionCallbackType;
  zIndex?: number;
  virtual?: boolean;
  virtualItemHeight?: number;
  virtualMaxHeight?: number | string;
  virtualOverscan?: number;
  virtualDynamicHeight?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  placeholder: '',
  height: 'basic',
  disabled: false,
  clearable: true,
  list: () => [],
  actionCallback: undefined,
  zIndex: undefined,
  virtual: false,
  virtualItemHeight: 34,
  virtualMaxHeight: 240,
  virtualOverscan: 5,
  virtualDynamicHeight: false,
});

const initialValue = ref(props.modelValue);

interface INmorphEmit {
  (e: 'update:model-value', value: string): void;
  (e: 'select', value: unknown): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-autocomplete': [`${open.value && 'open'}`],
  })
);

const userClosed = ref(false);
const updateValueHandler = (value: string) => {
  userClosed.value = value === '';
  initialValue.value = value;
  open.value = !userClosed.value && filteredList.value.length > 0;
  currentIndex.value = 0;
  emit('update:model-value', initialValue.value);
};

const open = ref(false);
const nmorphAutocompleteDOMRef = ref<NmorphDomElementType>(null);
const closeHandler = () => {
  userClosed.value = true;
  open.value = false;
};

const filteredList = computed(() => {
  return props.list.filter((variant) => {
    return Object.keys(variant).some((key) => {
      return String(variant[key]).toLowerCase().includes(initialValue.value.toLowerCase());
    });
  });
});

const virtualEnabled = computed(() => props.virtual && filteredList.value.length > 0);
const virtualItemHeight = computed(() => props.virtualItemHeight);
const virtualOverscan = computed(() => props.virtualOverscan);
const virtualDynamicHeight = computed(() => props.virtualDynamicHeight);
const virtualList = useVirtualList(filteredList, {
  enabled: virtualEnabled,
  itemHeight: virtualItemHeight,
  overscan: virtualOverscan,
  dynamic: virtualDynamicHeight,
});
const virtualItems = computed(() => virtualList.virtualItems.value);
const virtualSpacerStyle = computed(() => ({
  height: `${virtualList.totalHeight.value}px`,
}));
const virtualContentStyle = computed(() => ({
  transform: `translateY(${virtualList.offsetTop.value}px)`,
}));
const getCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const virtualMaxHeight = computed(() => getCssSize(props.virtualMaxHeight));
const currentIndex = ref(0);
const activeItem = computed(() => filteredList.value[currentIndex.value]);
const listboxId = computed(() => `${props.id || props.name || 'nmorph-autocomplete'}-listbox`);
const getOptionId = (index: number) => `${listboxId.value}-option-${index}`;

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === initialValue.value) return;
    initialValue.value = newValue;
  }
);

watch(filteredList, async (newValue) => {
  open.value = !userClosed.value && initialValue.value !== '' && newValue.length > 0;
  currentIndex.value = 0;
  await nextTick();
  virtualList.scrollToIndex(0);
  virtualList.refresh();
});

const selectItem = (listEl: INmorphAutocompleteListItem) => {
  emit('select', listEl);
  initialValue.value = listEl.value;
  emit('update:model-value', initialValue.value);
  setTimeout(() => {
    userClosed.value = true;
    open.value = false;
  });
};

const clickHandler = (listEl: INmorphAutocompleteListItem) => {
  selectItem(listEl);
};

const focusHandler = () => {
  userClosed.value = false;
  open.value = filteredList.value.length > 0;
};

const loader = ref(false);

watch(initialValue, async (newValue) => {
  if (newValue !== '' && props.actionCallback) {
    loader.value = true;
    await props.actionCallback();
    loader.value = false;
  }
});

watch(loader, (newValue) => {
  if (newValue) open.value = true;
});

watch(currentIndex, (newValue) => {
  if (virtualEnabled.value) virtualList.scrollToIndex(newValue);
});

const arrowDownHandler = () => {
  if (!filteredList.value.length) return;
  open.value = true;
  currentIndex.value = (currentIndex.value + 1) % filteredList.value.length;
};

const arrowUpHandler = () => {
  if (!filteredList.value.length) return;
  open.value = true;
  currentIndex.value = (currentIndex.value - 1 + filteredList.value.length) % filteredList.value.length;
};

const enterHandler = () => {
  if (!open.value || !activeItem.value) return;
  selectItem(activeItem.value);
};

const keydownHandler = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    arrowDownHandler();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    arrowUpHandler();
  } else if (event.key === 'Enter') {
    event.preventDefault();
    enterHandler();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    closeHandler();
  }
};

const inputAttrs = computed(() => ({
  role: 'combobox',
  'aria-autocomplete': 'list',
  'aria-expanded': open.value,
  'aria-controls': listboxId.value,
  'aria-activedescendant': open.value ? getOptionId(currentIndex.value) : undefined,
}));

const setVirtualItemRef = (element: unknown, index: number) => {
  const target = element instanceof Element ? element : (element as { $el?: Element } | null)?.$el;
  virtualList.measureElement(index, target);
};

const dropdownZIndex = useZIndex(open, () => props.zIndex);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-autocomplete-input-z-index': dropdownZIndex.value + 1,
}));
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-autocomplete__input-content">
      <div ref="nmorphAutocompleteDOMRef" class="nmorph-autocomplete__input">
        <NmorphTextInput
          :id="props.id"
          :name="props.name"
          :autocomplete="props.autocomplete"
          :height="props.height"
          :disabled="props.disabled"
          :model-value="initialValue"
          :placeholder="props.placeholder"
          :clearable="props.clearable"
          :input-attrs="inputAttrs"
          @focus="focusHandler"
          @keydown="keydownHandler"
          @update:model-value="updateValueHandler"
        />
      </div>
    </div>
    <NmorphDropdown
      v-if="nmorphAutocompleteDOMRef"
      :open="open"
      :relative-element="nmorphAutocompleteDOMRef"
      :y-offset="1"
      :z-index="dropdownZIndex"
      :restore-focus="false"
      content-class="nmorph-autocomplete__dropdown"
      :aria-label="props.name || props.id || 'autocomplete'"
      @on-outside-click="closeHandler"
      @on-escape-keydown="closeHandler"
    >
      <div v-if="loader" class="nmorph-autocomplete__loading">
        <slot name="loader">
          <NmorphIcon size="large">
            <NmorphIconLoader />
          </NmorphIcon>
        </slot>
      </div>
      <div
        v-else-if="virtualEnabled"
        :id="listboxId"
        :ref="virtualList.containerRef"
        class="nmorph-autocomplete__list nmorph-autocomplete__list--virtual"
        :class="{ 'nmorph-autocomplete__list--dynamic': virtualDynamicHeight }"
        :style="{ '--autocomplete-virtual-item-height': `${virtualItemHeight}px`, maxHeight: virtualMaxHeight }"
        role="listbox"
        @scroll="virtualList.scrollHandler"
      >
        <div class="nmorph-autocomplete__virtual-spacer" :style="virtualSpacerStyle">
          <div class="nmorph-autocomplete__virtual-content" :style="virtualContentStyle">
            <div
              v-for="virtualItem in virtualItems"
              :id="getOptionId(virtualItem.index)"
              :ref="(element) => setVirtualItemRef(element, virtualItem.index)"
              :key="virtualItem.index"
              class="nmorph-autocomplete__list-item"
              :class="{ 'nmorph-autocomplete__list-item--focused': virtualItem.index === currentIndex }"
              role="option"
              :aria-selected="virtualItem.index === currentIndex"
              @click="() => clickHandler(virtualItem.item)"
            >
              <slot :scope="virtualItem.item"> {{ virtualItem.item.value }} </slot>
            </div>
          </div>
        </div>
      </div>
      <div v-else :id="listboxId" class="nmorph-autocomplete__list" role="listbox">
        <div
          v-for="(listEl, idx) in filteredList"
          :id="getOptionId(idx)"
          :key="idx"
          class="nmorph-autocomplete__list-item"
          :class="{ 'nmorph-autocomplete__list-item--focused': idx === currentIndex }"
          role="option"
          :aria-selected="idx === currentIndex"
          @click="() => clickHandler(listEl)"
        >
          <slot :scope="listEl"> {{ listEl.value }} </slot>
        </div>
      </div>
    </NmorphDropdown>
  </div>
</template>

<style lang="scss">
.nmorph-autocomplete {
  .nmorph-autocomplete__input-content {
    position: relative;
  }

  &.nmorph-autocomplete--open {
    .nmorph-autocomplete__input-content {
      z-index: var(--nmorph-autocomplete-input-z-index);
    }
  }
}

.nmorph-autocomplete__list {
  padding: var(--indentation-01) 0;
}

.nmorph-autocomplete__list-item {
  box-sizing: border-box;
  padding: var(--indentation-00) var(--default-indentation-input);
  cursor: pointer;
}

.nmorph-autocomplete__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.nmorph-autocomplete__list-item:hover,
.nmorph-autocomplete__list-item--focused {
  color: var(--nmorph-white-color);
  background: var(--nmorph-accent-color);
}

.nmorph-autocomplete__list--virtual {
  overflow-y: auto;
}

.nmorph-autocomplete__list--virtual .nmorph-autocomplete__list-item {
  height: var(--autocomplete-virtual-item-height);
  overflow: hidden;
}

.nmorph-autocomplete__list--dynamic .nmorph-autocomplete__list-item {
  height: auto;
}

.nmorph-autocomplete__virtual-spacer {
  position: relative;
}

.nmorph-autocomplete__virtual-content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
