<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { inject } from 'vue';

const columnProperty = inject<string>('column-property');
const tableIdentifier = inject<string>('table-identifier');

interface IProps {
  row: number;
}
const props = withDefaults(defineProps<IProps>(), {});
const modifiers = computed(() =>
  useModifiers({
    'nmorph-table-cell': [],
  })
);
const isMounted = ref(false);
const targetId = computed(() => `#table-cell-${tableIdentifier}-${props.row}-${columnProperty}`);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="targetId">
      <slot />
    </teleport>
  </div>
</template>
