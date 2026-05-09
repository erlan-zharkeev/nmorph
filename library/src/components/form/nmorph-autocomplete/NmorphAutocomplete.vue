<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useVirtualList } from '@/hooks';
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
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  placeholder: '',
  height: 'basic',
  disabled: false,
  clearable: true,
  list: () => [],
  actionCallback: undefined,
  virtual: false,
  virtualItemHeight: 34,
  virtualMaxHeight: 240,
  virtualOverscan: 5,
});

const initialValue = ref(props.modelValue);

interface INmorphEmit {
  (e: 'update:model-value', value: string): void;
  (e: 'select', value: unknown): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-autocomplete': [],
  })
);

const updateValueHandler = (value: string) => {
  initialValue.value = value;
  emit('update:model-value', initialValue.value);
};

const open = ref(false);
const nmorphAutocompleteDOMRef = ref<NmorphDomElementType>(null);
const closeHandler = () => {
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
const virtualList = useVirtualList(filteredList, {
  enabled: virtualEnabled,
  itemHeight: virtualItemHeight,
  overscan: virtualOverscan,
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

watch(filteredList, async (newValue) => {
  open.value = newValue.length > 0;
  await nextTick();
  virtualList.scrollToIndex(0);
  virtualList.refresh();
});

const clickHandler = (listEl: INmorphAutocompleteListItem) => {
  emit('select', listEl);
  initialValue.value = listEl.value;
  setTimeout(() => {
    open.value = false;
  });
};

const focusHandler = () => {
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
</script>

<template>
  <div :class="modifiers">
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
          @focus="focusHandler"
          @update:model-value="updateValueHandler"
        />
      </div>
    </div>
    <NmorphDropdown
      v-if="nmorphAutocompleteDOMRef"
      :open="open"
      :relative-element="nmorphAutocompleteDOMRef"
      :y-offset="1"
      :z-index="props.zIndex"
      @on-outside-click="closeHandler"
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
        :ref="virtualList.containerRef"
        class="nmorph-autocomplete__list nmorph-autocomplete__list--virtual"
        :style="{ '--autocomplete-virtual-item-height': `${virtualItemHeight}px`, maxHeight: virtualMaxHeight }"
        @scroll="virtualList.scrollHandler"
      >
        <div class="nmorph-autocomplete__virtual-spacer" :style="virtualSpacerStyle">
          <div class="nmorph-autocomplete__virtual-content" :style="virtualContentStyle">
            <div
              v-for="virtualItem in virtualItems"
              :key="virtualItem.index"
              class="nmorph-autocomplete__list-item"
              @click="() => clickHandler(virtualItem.item)"
            >
              <slot :scope="virtualItem.item"> {{ virtualItem.item.value }} </slot>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="nmorph-autocomplete__list">
        <div
          v-for="(listEl, idx) in filteredList"
          :key="idx"
          class="nmorph-autocomplete__list-item"
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
  .nmorph-autocomplete__list-item {
    padding: var(--indentation-02) var(--indentation-04);
    cursor: pointer;

    &:last-child {
      border-bottom-left-radius: var(--indentation-02);
      border-bottom-right-radius: var(--indentation-02);
    }
  }

  .nmorph-autocomplete__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }

  .nmorph-autocomplete__list-item:hover {
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

  .nmorph-autocomplete__virtual-spacer {
    position: relative;
  }

  .nmorph-autocomplete__virtual-content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
}
</style>
