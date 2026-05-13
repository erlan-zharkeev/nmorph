<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import { INmorphCarouselInjection } from '@/components';
import { onBeforeUnmount, onMounted } from 'vue';

interface INmorphProps {
  name: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-carousel-item': [],
  })
);

const carouselData = inject<INmorphCarouselInjection>('carousel-data');

const isMounted = ref(false);

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
    <teleport :to="`#nmorph-carousel-item-${carouselData?.carouselId}-${props.name}`">
      <slot />
    </teleport>
  </div>
</template>
