<script setup lang="ts">
import { computed, ref, inject, watch } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphCheckboxOption,
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
  NmorphDomElementType,
} from '@/types';

const groupSelectedValue = inject<NmorphCheckboxGroupSelectedValueInjectionType>(
  'checkbox-group-selected-value',
  undefined
);

const changeValue = inject<NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType>(
  'change-checkbox-value-handler',
  undefined
);

const props = withDefaults(defineProps<INmorphCheckboxOption>(), {
  id: '',
  disabled: false,
  modelValue: false,
  label: '',
  design: 'checkbox',
});

interface INmorphEmit {
  (e: 'update:model-value', val: boolean): void;
}

watch(
  () => props.modelValue,
  (updatedValue) => {
    initialValue.value = updatedValue;
  }
);

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

const hasGroup = groupSelectedValue !== undefined;
const initialValue = hasGroup ? ref(groupSelectedValue.value) : ref(props.modelValue);

const checked = computed(() => (hasGroup ? groupSelectedValue.value.includes(props.id) : props.modelValue));

const emit = defineEmits<INmorphEmit>();

const handleChange = () => {
  if (props.disabled) return;
  if (!hasGroup) {
    initialValue.value = !initialValue.value;
    emit('update:model-value', initialValue.value);
    return;
  }
  if (changeValue && Array.isArray(initialValue.value)) changeValue(props.id, initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-checkbox': [
      `${checked.value && 'checked'}`,
      `${props.disabled && 'disabled'}`,
      `${props.design === 'button' && 'button'}`,
    ],
  })
);
</script>

<template>
  <label :class="modifiers">
    <div v-if="props.design === 'checkbox'" class="nmorph-checkbox__content">
      <div class="nmorph-checkbox__input-wrapper">
        <input
          ref="inputDOMRef"
          type="checkbox"
          :disabled="props.disabled"
          :checked="checked"
          class="nmorph-native-input"
          @change="handleChange"
        />
        <div class="nmorph-checkbox__fake" />
        <div v-if="checked" class="nmorph-checkbox__fake-checked" />
      </div>
      <div v-if="props.label" class="nmorph-checkbox__label">
        <span>{{ props.label }}</span>
      </div>
      <div v-else class="nmorph-checkbox__label">
        <slot />
      </div>
    </div>
    <div v-if="props.design === 'button'" class="nmorph-checkbox__content">
      <input ref="inputDOMRef" type="checkbox" :disabled="props.disabled" :checked="checked" @change="handleChange" />
      <div v-if="props.label" class="nmorph-checkbox__fake">
        <span>{{ props.label }}</span>
      </div>
      <div v-else class="nmorph-checkbox__fake">
        <slot name="label" />
      </div>
    </div>
  </label>
</template>

<style lang="scss">
.nmorph-checkbox {
  --size: var(--extra-thin-component);

  display: inline-flex;
  cursor: pointer;

  .nmorph-checkbox__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nmorph-checkbox__input-wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  input {
    opacity: 0;

    @include absolute-zero;
    @include wh100;
  }

  .nmorph-checkbox__fake {
    border-radius: var(--default-border-radius);

    @include wh100;
    @include absolute-zero;
    @include nmorph-inset;
  }

  .nmorph-checkbox__fake-checked {
    width: 50%;
    height: 50%;
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-20);

    @include absolute-center;
  }

  .nmorph-checkbox__label {
    margin-left: var(--indentation-02);
  }

  .nmorph-checkbox__fake span {
    line-height: 0.8;
  }
}

.nmorph-checkbox--button {
  --size: var(--thick-component);

  .nmorph-checkbox__fake {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--size);
    padding: var(--indentation-03);
    border-radius: var(--default-border-radius);

    @include nmorph-outset;
  }
}

.nmorph-checkbox--checked {
  .nmorph-checkbox__fake {
    @include nmorph-inset;
  }
}

.nmorph-checkbox--disabled {
  @include disabled;
}
</style>
