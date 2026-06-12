<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import { INmorphCarouselInjection } from '@/components';
import { onBeforeUnmount, onMounted } from 'vue';
import type { INmorphCarouselItemProps } from './types';

const props = withDefaults(defineProps<INmorphCarouselItemProps>(), {});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-carousel-item': [],
  })
);

const carouselData = inject<INmorphCarouselInjection>('carousel-data');

const isMounted = ref(false);

const getCarouselItemId = (itemName: string, clone?: 'before' | 'after') =>
  `#nmorph-carousel-item-${carouselData?.carouselId}-${itemName}${clone ? `-${clone}` : ''}`;

const teleportTargets = computed(() => {
  if (!carouselData) return [];

  const targets = [getCarouselItemId(props.name)];
  const data = carouselData.data.value;

  if (!carouselData.hasLoopClones.value || !data.length) return targets;

  if (props.name === data[0]) targets.push(getCarouselItemId(props.name, 'after'));
  if (props.name === data[data.length - 1]) targets.push(getCarouselItemId(props.name, 'before'));

  return targets;
});

onMounted(() => {
  isMounted.value = true;
  if (!carouselData) return;
  carouselData.data.value.push(props.name);
});

onBeforeUnmount(() => {
  if (!carouselData) return;
  const index = carouselData.data.value.indexOf(props.name);
  if (index !== -1) carouselData.data.value.splice(index, 1);
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport v-for="target in teleportTargets" :key="target" :to="target">
      <slot />
    </teleport>
  </div>
</template>
