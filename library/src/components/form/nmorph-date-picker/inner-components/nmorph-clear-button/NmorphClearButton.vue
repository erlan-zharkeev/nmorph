<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon } from '@/components';

interface INmorphEmit {
  (e: 'clear'): void;
}

const emit = defineEmits<INmorphEmit>();

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
