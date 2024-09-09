<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import {
  NmorphIcon,
  NmorphDropdown,
  NmorphTextInput,
  NmorphAutocompleteActionCallbackType,
  INmorphAutocompleteListItem,
} from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: string;
  placeholder?: string;
  clearable?: boolean;
  list: INmorphAutocompleteListItem[];
  actionCallback?: NmorphAutocompleteActionCallbackType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  placeholder: 'Please input',
  fill: true,
  height: 'default',
  disabled: false,
  clearable: true,
  list: () => [],
  actionCallback: undefined,
});

const initialValue = ref(props.modelValue);

interface INmorphEmit {
  (e: 'update:modelValue', value: string): void;
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
  emit('update:modelValue', initialValue.value);
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

watch(filteredList, (newValue) => {
  open.value = newValue.length > 0;
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
          :fill="props.fill"
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
      @on-outside-click="closeHandler"
    >
      <div v-if="loader" class="nmorph-autocomplete__loading">
        <slot name="loader">
          <NmorphIcon name="loader" size="large" />
        </slot>
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
.nmorph-autocomplete__list-item {
  margin-bottom: var(--indentation-01);
  padding: var(--indentation-02) var(--indentation-04);
}

.nmorph-autocomplete__loading {
  @include flex-full-center;

  height: 100px;
}

.nmorph-autocomplete__list-item:hover {
  color: var(--nmorph-white-color);
  background: var(--nmorph-accent-color);
}
</style>
