<script setup lang="ts">
import { Ref, computed, provide, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCollapseModel } from './types';

interface IProps {
  modelValue: NmorphCollapseModel;
  accordion?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  accordion: false,
});

const initialValue = ref(props.modelValue);

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

provide<Ref<NmorphCollapseModel>>('collapse-data', initialValue);
provide('update-model', updateValue);

const emit = defineEmits<IEmit>();
interface IEmit {
  (e: 'update:modelValue', value: NmorphCollapseModel): void;
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

<style lang="scss">
.nmorph-collapse {
}
</style>
