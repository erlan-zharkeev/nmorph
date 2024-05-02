<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDirection } from './types';

interface IProps {
  direction?: NmorphDirection;
}

const props = withDefaults(defineProps<IProps>(), {
  direction: 'horizontal',
});

const emit = defineEmits<IEmit>();

interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-divider': [props.direction],
  })
);
</script>

<template>
  <div :class="modifiers" />
</template>

<style lang="scss">
.nmorph-divider {
  @include nmorph-outset;
}

.nmorph-divider--horizontal {
  width: 100%;
  height: 2px;
}

.nmorph-divider--vertical {
  height: auto;
  width: 2px;
}
</style>
