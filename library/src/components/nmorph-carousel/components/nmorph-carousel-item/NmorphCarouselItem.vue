<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCarouselInjection } from '../../types';
import { onMounted } from 'vue';

interface IProps {
  name: string;
}

const props = withDefaults(defineProps<IProps>(), {});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-carousel-item': [],
  })
);

const carouselData = inject<NmorphCarouselInjection>('carousel-data');

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  if (!carouselData) return;
  carouselData.data.value.push(props.name);
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="`#nmorph-carousel-item-${carouselData?.carouselId}-${props.name}`">
      <slot />
    </teleport>
  </div>
</template>
