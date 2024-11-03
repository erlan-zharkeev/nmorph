<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { generateUUID, useModifiers } from '@/utils';
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
} from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: INmorphSelectOption[];
  optionsMap?: INmorphSelectOption[];
  modelValue?: NmorphSelectModelValueType;
  loading?: boolean;
  open?: boolean;
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  noElementPlaceholder: 'Choose value',
  valueRequired: false,
  options: () => [],
  optionsMap: () => [],
  modelValue: '',
  loading: false,
  height: 'default',
  disabled: false,
  open: false,
  id: '',
  name: '',
});

const emit = defineEmits<{
  (e: 'update:model-value', val: NmorphSelectModelValueType): void;
}>();

const initialValue = ref<NmorphSelectModelValueType>(props.modelValue);
const open = ref(props.open);

const optionsDOMRef = ref<NmorphDomElementType>(null);
const optionsHeight = ref<string | null>(null);
const selectedLineOutset = ref(true);

const id = props.id ? props.id : generateUUID();
const name = props.name ? props.name : generateUUID();

const changeHandler = (value: string) => {
  if (props.disabled) return;
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
      `${open.value && 'open'}`,
      `${selectedLineOutset.value ? 'selected-line-outset' : 'selected-line-inset'}`,
      `${focus.value && 'focus'}`,
    ],
  })
);

const clickHandler = () => {
  if (props.disabled) return;
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
    if (initialValue.value === '') return props.noElementPlaceholder;
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

const spaceHandler = () => {
  open.value = !open.value;
};

const arrowDownHandler = () => {
  currentIndex.value = (currentIndex.value + 1) % domOptions.value.length;
};

const arrowUpHandler = () => {
  currentIndex.value = (currentIndex.value - 1 + domOptions.value.length) % domOptions.value.length;
};

const enterHandler = () => {
  if (!open.value) return;
  changeHandler(currentFocusedEl.value);
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-select__content">
      <select
        :id="id"
        :name="name"
        @focus="focusHandler"
        @blur="blurHandler"
        @keydown.space="spaceHandler"
        @keydown.arrow-down="arrowDownHandler"
        @keydown.arrow-up="arrowUpHandler"
        @keydown.enter="enterHandler"
      >
        <option v-for="option in domOptions" :key="option" :value="option" />
      </select>
      <div ref="nmorphSelectDOMRef" class="nmorph-select__selected-values-line" @click.stop="clickHandler">
        <div v-if="typeof initialValue === 'string'" class="nmorph-select__selected-value">
          {{ selectedValueTitle }}
        </div>
        <div v-else-if="initialValue.length === 0" class="nmorph-select__selected-value">
          {{ props.noElementPlaceholder }}
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
        <NmorphIcon :name="props.loading ? 'loader' : 'chevron-down'" class="nmorph-select__chevron" />
      </div>
    </div>
    <NmorphDropdown
      v-if="nmorphSelectDOMRef && !props.disabled"
      :open="open"
      :relative-element="nmorphSelectDOMRef"
      @on-outside-click="closeHandler"
    >
      <div ref="optionsDOMRef" class="nmorph-select__options">
        <NmorphIcon v-if="props.loading" name="loader" class="nmorph-select__chevron" size="medium" />
        <NmorphSelectOption
          v-else
          v-for="option in options"
          :key="option.value"
          v-bind="option"
          :height="props.height"
        />
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

  select,
  option {
    opacity: 0;
    width: 0;
    height: 0;
    border: none;
    padding: 0;
    position: absolute;
  }
}

.nmorph-select--loading {
  .nmorph-select__options {
    display: flex;
    justify-content: center;
    padding: 16px;
  }
}

.nmorph-select--disabled {
  @include disabled;
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

.nmorph-select--focus {
  outline: 2px var(--nmorph-accent-color) solid;
  .nmorph-select__content {
    box-shadow: none;
  }
}
</style>
