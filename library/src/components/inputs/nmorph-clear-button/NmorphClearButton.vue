<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon } from '@/components';

interface IEmit {
  (e: 'clear'): void;
}

const emit = defineEmits<IEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-input-clear-button': [],
  })
);
</script>

<template>
  <div :class="modifiers">
    <NmorphIcon name="error" @click.stop="emit('clear')" />
  </div>
</template>

<style lang="scss">
.nmorph-input-clear-button {
}
</style>
