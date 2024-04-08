<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { NmorphCheckbox } from '@/components';
import { getModifiers } from '@/utils';
import { NmorphCommonInputProps, NmorphComponentDirection } from '@/types/common';
import { ICheckboxOption, ICheckboxStyleType } from '../types';

interface IProps extends NmorphCommonInputProps {
  modelValue: string[];
  options?: ICheckboxOption[];
  styleType?: keyof typeof ICheckboxStyleType;
  direction?: keyof typeof NmorphComponentDirection;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [],
  options: () => [],
  styleType: 'checkbox-style',
  direction: 'row',
});

interface IEmit {
  (e: 'update:modelValue', val: string[]): void;
}

const initialValue = ref(props.modelValue);

const emit = defineEmits<IEmit>();

const changeHandler = (id: string) => {
  if (initialValue.value.includes(id)) {
    initialValue.value = initialValue.value.filter((checkboxId) => checkboxId !== id);
  } else initialValue.value.push(id);
  emit('update:modelValue', initialValue.value);
};

const modifiers = computed(() =>
  getModifiers({
    'nmorph-checkbox-group': [props.styleType, props.direction],
  })
);

provide('checkbox-group-selected-value', initialValue);
provide('change-checkbox-value-handler', changeHandler);
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
          :disabled="option.disabled"
          :style-type="props.styleType"
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
    margin-bottom: var(--indentation-03);
  }
}

.nmorph-checkbox-group--column {
  .nmorph-checkbox-group__content {
    flex-direction: column;
  }

  .nmorph-checkbox:not(:last-child) {
    margin-right: var(--indentation-00);
    margin-bottom: var(--indentation-03);
  }
}
</style>
@/types/common
