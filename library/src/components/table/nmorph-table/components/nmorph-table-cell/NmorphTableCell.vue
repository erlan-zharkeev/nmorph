<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useModifiers } from '@/utils';

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

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="`#table-cell-${props.row}-operations`">
      <slot />
    </teleport>
  </div>
</template>
<style lang="scss"></style>
