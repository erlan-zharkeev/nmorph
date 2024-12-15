<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon, NmorphIconError } from '@/components';

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
    <NmorphIcon @click.stop="emit('clear')">
      <NmorphIconError />
    </NmorphIcon>
  </div>
</template>
