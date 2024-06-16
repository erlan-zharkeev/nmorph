<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import {
  NmorphCollapseDataInjectionType,
  NmorphCollapseModelType,
  NmorphCollapseUpdateModelInjectionType,
} from './types';

interface INmorphProps {
  modelValue: NmorphCollapseModelType;
  accordion?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  accordion: false,
});

const initialValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    initialValue.value = newValue;
  }
);

const updateValue = (id: string, value: boolean) => {
  if (!props.accordion) {
    if (!Array.isArray(initialValue.value)) initialValue.value = [id];
    else {
      const index = initialValue.value.indexOf(id);
      if (value && index === -1) initialValue.value.push(id);
      if (!value && index !== -1) initialValue.value.splice(index, 1);
    }
  } else initialValue.value = value ? [id] : [];
  emit('update:modelValue', initialValue.value);
};

provide<NmorphCollapseDataInjectionType>('collapse-data', initialValue);
provide<NmorphCollapseUpdateModelInjectionType>('update-model', updateValue);

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update:modelValue', value: NmorphCollapseModelType): void;
}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-collapse': [],
  })
);
</script>
<template>
  <div :class="modifiers">
    <slot />
  </div>
</template>
