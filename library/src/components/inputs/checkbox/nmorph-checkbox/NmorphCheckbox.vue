<script setup lang="ts">
import { computed, ref, Ref, inject, onMounted } from 'vue';
import { useModifiers } from '@/utils';
import { ICheckboxOption } from '../types';

const groupSelectedValue = inject<Ref<string[]>>('checkbox-group-selected-value');
const changeValue = inject<(value: string, currentState: string[]) => void>('change-checkbox-value-handler');

const props = withDefaults(defineProps<ICheckboxOption>(), {
  disabled: false,
  modelValue: false,
  label: '',
  styleType: 'checkbox-style',
});

interface IEmit {
  (e: 'inputDOMRef', val: Ref<NmorphDomElement>): void;
  (e: 'update:modelValue', val: boolean): void;
}

onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});

const inputDOMRef = ref<NmorphDomElement>(null);
const hasGroup = groupSelectedValue !== undefined;
const initialValue = hasGroup ? ref(groupSelectedValue.value) : ref(props.modelValue);

const checked = computed(() => (hasGroup ? groupSelectedValue.value.includes(props.id) : props.modelValue));

const emit = defineEmits<IEmit>();
const handleChange = () => {
  if (props.disabled) return;
  if (!hasGroup) {
    initialValue.value = !initialValue.value;
    emit('update:modelValue', initialValue.value);
    return;
  }
  if (changeValue && Array.isArray(initialValue.value)) changeValue(props.id, initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-checkbox': [`${checked.value && 'checked'}`, `${props.disabled && 'disabled'}`, props.styleType],
  })
);
</script>

<template>
  <label :class="modifiers">
    <div v-if="props.styleType === 'checkbox-style'" class="nmorph-checkbox__content">
      <div class="nmorph-checkbox__input-wrapper">
        <input ref="inputDOMRef" type="checkbox" :disabled="props.disabled" :checked="checked" @change="handleChange" />
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
    <div v-if="props.styleType === 'button-style'" class="nmorph-checkbox__content">
      <input ref="inputDOMRef" type="checkbox" :disabled="props.disabled" :checked="checked" @change="handleChange" />
      <div v-if="props.label" class="nmorph-checkbox__fake">
        <span> {{ props.label }} </span>
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
    background: var(--accent-color-01);
    border-radius: var(--border-radius-20);

    @include absolute-center;
  }

  .nmorph-checkbox__label {
    margin-left: var(--indentation-02);
  }

  .nmorph-checkbox__fake span {
    margin-top: 2px;
  }
}

.nmorph-checkbox--button-style {
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
