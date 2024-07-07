<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDirectionType } from '@/components';

interface INmorphProps {
  direction?: NmorphDirectionType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  direction: 'horizontal',
});

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
  width: 2px;
  height: auto;
}
</style>
