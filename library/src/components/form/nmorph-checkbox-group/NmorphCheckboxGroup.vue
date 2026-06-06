<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { NmorphCheckbox } from '@/components';
import { useModifiers } from '@/utils';
import {
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
} from '@/types';
import { useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphCheckboxGroupEmit, INmorphCheckboxGroupProps } from './types';

const props = withDefaults(defineProps<INmorphCheckboxGroupProps>(), {
  modelValue: () => [],
  options: () => [],
  design: 'nmorph',
  direction: 'row',
  thickness: 'basic',
  disabled: false,
});

const emit = defineEmits<INmorphCheckboxGroupEmit>();
const { modelValue, updateModelValue } = useFormItemModel<string[]>(
  props,
  (value) => emit('update:model-value', value),
  []
);
const initialValue = ref([...modelValue.value]);

watch(
  modelValue,
  (value) => {
    initialValue.value = [...value];
  },
  { deep: true }
);

const changeHandler = (id: string) => {
  initialValue.value = initialValue.value.includes(id)
    ? initialValue.value.filter((checkboxId) => checkboxId !== id)
    : [...initialValue.value, id];
  updateModelValue(initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-checkbox-group': [props.design, props.direction],
  })
);
const thickness = computed(() => props.thickness);

provide<NmorphCheckboxGroupSelectedValueInjectionType>('checkbox-group-selected-value', initialValue);
provide<NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType>('change-checkbox-value-handler', changeHandler);
provide('checkbox-group-thickness', thickness);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-checkbox-group__wrapper">
      <div class="nmorph-checkbox-group__content">
        <NmorphCheckbox
          v-for="(option, idx) in options"
          :id="option.id"
          :key="idx"
          :label="option.label"
          :disabled="option.disabled || props.disabled"
          :design="option.design || props.design"
          :thickness="option.thickness || thickness"
        />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-checkbox-group {
  display: inline-block;

  .nmorph-checkbox-group__wrapper {
    display: flex;
    align-items: center;
  }

  .nmorph-checkbox-group__content {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

  .nmorph-checkbox:not(:last-child) {
    margin-right: var(--indentation-03);
  }

  &.nmorph-checkbox-group--column {
    .nmorph-checkbox-group__content {
      flex-direction: column;
    }

    .nmorph-checkbox:not(:last-child) {
      margin-right: var(--indentation-00);
      margin-bottom: var(--indentation-03);
    }

    .nmorph-checkbox:last-child {
      margin-bottom: var(--indentation-00);
    }
  }
}
</style>
