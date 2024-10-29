<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { NmorphCheckbox } from '@/components';
import { useModifiers } from '@/utils';
import {
  INmorphCheckboxOption,
  INmorphCommonInputProps,
  NmorphCheckboxDesignType,
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
  NmorphComponentDirection,
} from '@/types';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue: string[];
  options?: INmorphCheckboxOption[];
  design?: NmorphCheckboxDesignType;
  direction?: keyof typeof NmorphComponentDirection;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: () => [],
  options: () => [],
  design: 'checkbox',
  direction: 'row',
});

interface INmorphEmit {
  (e: 'update:model-value', val: string[]): void;
}

const initialValue = ref(props.modelValue);

const emit = defineEmits<INmorphEmit>();

const changeHandler = (id: string) => {
  if (initialValue.value.includes(id)) {
    initialValue.value = initialValue.value.filter((checkboxId) => checkboxId !== id);
  } else initialValue.value.push(id);
  emit('update:model-value', initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-checkbox-group': [props.design, props.direction],
  })
);

provide<NmorphCheckboxGroupSelectedValueInjectionType>('checkbox-group-selected-value', initialValue);
provide<NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType>('change-checkbox-value-handler', changeHandler);
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
          :design="props.design"
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

  .nmorph-checkbox {
    margin-bottom: var(--indentation-03);
  }

  .nmorph-checkbox:not(:last-child) {
    margin-right: var(--indentation-03);
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

  .nmorph-checkbox:last-child {
    margin-bottom: var(--indentation-00);
  }
}
</style>
