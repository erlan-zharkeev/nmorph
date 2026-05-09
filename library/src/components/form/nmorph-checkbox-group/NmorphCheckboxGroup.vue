<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { NmorphCheckbox } from '@/components';
import { useModifiers } from '@/utils';
import {
  INmorphCheckboxOption,
  INmorphCommonInputProps,
  NmorphCheckboxDesignType,
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
  NmorphComponentDirection,
  NmorphSelectionControlHeightType,
} from '@/types';

interface INmorphProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue: string[];
  options?: INmorphCheckboxOption[];
  design?: NmorphCheckboxDesignType;
  direction?: keyof typeof NmorphComponentDirection;
  height?: NmorphSelectionControlHeightType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: () => [],
  options: () => [],
  design: 'button',
  direction: 'row',
  height: 'thin',
  disabled: false,
});

interface INmorphEmit {
  (e: 'update:model-value', val: string[]): void;
}

const initialValue = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (value) => {
    initialValue.value = [...value];
  },
  { deep: true }
);

const emit = defineEmits<INmorphEmit>();

const changeHandler = (id: string) => {
  initialValue.value = initialValue.value.includes(id)
    ? initialValue.value.filter((checkboxId) => checkboxId !== id)
    : [...initialValue.value, id];
  emit('update:model-value', initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-checkbox-group': [props.design, props.direction],
  })
);
const height = computed(() => props.height);

provide<NmorphCheckboxGroupSelectedValueInjectionType>('checkbox-group-selected-value', initialValue);
provide<NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType>('change-checkbox-value-handler', changeHandler);
provide('checkbox-group-height', height);
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
          :model-value="option.modelValue"
          :disabled="option.disabled || props.disabled"
          :design="props.design"
          :height="option.height || props.height"
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
